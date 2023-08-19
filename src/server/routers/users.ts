import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { procedure, router } from '../trpc'
import { Database } from '@/@types/supabase'
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies'

export const usersRouter = router({
  getUser: procedure.query(async ({ input, ctx }) => {
    const headers = new Headers(ctx.req.headers as any)

    const supabase = createServerComponentClient<Database>({
      cookies: () => new RequestCookies(headers),
    })

    const { data: user, error } = await supabase.auth.getUser()

    return !error ? user : null
  }),
})
