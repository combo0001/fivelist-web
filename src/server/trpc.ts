import { transformer } from '@/utils/transformer'
import { initTRPC } from '@trpc/server'
import { Context } from './context'

export const { router, procedure } = initTRPC.context<Context>().create({
  transformer,
  errorFormatter({ shape }) {
    return shape
  },
})
