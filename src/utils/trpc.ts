import { AppRouter } from '@/server/routers/_app'
import { httpBatchLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'

import { transformer } from './transformer'
import { getBaseURL } from './getBaseURL'

export const trpc = createTRPCNext<AppRouter>({
  config(opts) {
    const { ctx } = opts

    if (typeof window !== 'undefined') {
      return {
        transformer,
        links: [
          httpBatchLink({
            url: '/api/',
          }),
        ],
      }
    }

    return {
      transformer,
      links: [
        httpBatchLink({
          url: `${getBaseURL()}/api/`,
          headers() {
            if (!ctx?.req?.headers) {
              return {}
            }

            return {
              cookie: ctx.req.headers.cookie,
            }
          },
        }),
      ],
    }
  },
  ssr: true,
})
