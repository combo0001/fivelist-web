import { Database } from '@/@types/supabase'
import {
  createRouteHandlerClient,
  Session,
  SupabaseClient,
} from '@supabase/auth-helpers-nextjs'
import { inferAsyncReturnType } from '@trpc/server'
import { CreateNextContextOptions } from '@trpc/server/adapters/next'
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies'

interface CreateInnerContextOptions extends Partial<CreateNextContextOptions> {
  supabase: SupabaseClient<Database, 'public'>
  session: Session | null
}

export async function createContextInner(opts?: CreateInnerContextOptions) {
  return {
    supabase: opts?.supabase,
    session: opts?.session,
  }
}

export async function createContext({ req, res }: CreateNextContextOptions) {
  const headers = new Headers(req.headers as any)

  const supabase = createRouteHandlerClient<Database>({
    cookies: () => new RequestCookies(headers),
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const contextInner = await createContextInner({ session, supabase })

  return {
    ...contextInner,
    req,
    res,
  }
}

export type Context = inferAsyncReturnType<typeof createContextInner>
