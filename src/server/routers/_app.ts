import { router } from '@/server/trpc'

import { usersRouter } from './users'
import { serversRouter } from './servers'
import { paymentsRouter } from './payments'

export const appRouter = router({
  users: usersRouter,
  servers: serversRouter,
  payment: paymentsRouter,
})

export type AppRouter = typeof appRouter
