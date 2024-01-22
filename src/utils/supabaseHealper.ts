import { Database } from '@/@types/supabase'
import { createContextInner } from '@/server/context'
import { appRouter } from '@/server/routers/_app'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { NextApiRequest } from 'next'
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies'
import SuperJSON from 'superjson'

export const getServerHelper = async () =>
  createServerSideHelpers({
    router: appRouter,
    ctx: await createContextInner(),
    transformer: SuperJSON,
  })

export const getSupabaseByRequest = async (req: NextApiRequest) => {
  const headers = new Headers(req.headers as any)

  const supabase = createRouteHandlerClient<Database>(
    {
      cookies: () => new RequestCookies(headers),
    },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    },
  )

  return supabase
}
