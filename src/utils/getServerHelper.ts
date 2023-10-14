import { createContextInner } from '@/server/context'
import { appRouter } from '@/server/routers/_app'
import { createServerSideHelpers } from '@trpc/react-query/server'
import SuperJSON from 'superjson'

export const getServerHelper = async () =>
  createServerSideHelpers({
    router: appRouter,
    ctx: await createContextInner(),
    transformer: SuperJSON,
  })
