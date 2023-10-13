import { procedure } from '@/server/trpc'
import { z } from 'zod'
import { isUserValid } from '../../users/utils/isUserValid'

const ServerSubscribeInputSchema = z.object({
})

const ServerSubscribeOutputSchema = z.void()

export const subscribePlan = procedure
  .input(ServerSubscribeInputSchema)
  .output(ServerSubscribeOutputSchema)
  .mutation(async ({ input, ctx }) => {
    let { supabase, session } = ctx

    if (!supabase || !session || !isUserValid(session)) return
    
    return
  })
