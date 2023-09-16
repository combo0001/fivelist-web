import { router } from '@/server/trpc'

import { usersRouter } from './users'
import { serversRouter } from './servers'

export const appRouter = router({
  users: usersRouter,
  servers: serversRouter
})

export type AppRouter = typeof appRouter
