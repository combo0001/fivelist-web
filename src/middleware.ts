import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const requestURL = new URL(req.url)
  const authCode = requestURL.searchParams.get('code')

  if (authCode) {
    const supabase = createMiddlewareClient({ req, res })

    const { data, error } = await supabase.auth.exchangeCodeForSession(authCode)

    if (!error) {
      await supabase.auth.setSession(data.session)
    }
  }

  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
