import { createContext } from '@/server/context'
import { procedure } from '@/server/trpc'
import { inferAsyncReturnType } from '@trpc/server'
import { z } from 'zod'
import { revalidateServer } from '../utils/revalidateServer'
import { ServerCustomIdSchema, ServerJoinIdSchema } from '@/schemas/servers/IdentitySchema'

const ServerCustomIdInputSchema = z.object({
  joinId: ServerJoinIdSchema,
  pageId: z.string().uuid(),
  customId: ServerCustomIdSchema
})

const ServerCustomIdOutputSchema = z.void()

export const setServerCustomId = procedure
  .input(ServerCustomIdInputSchema)
  .output(ServerCustomIdOutputSchema)
  .mutation(async ({ input, ctx }) => {
    const { supabase, session } = ctx

    if (!supabase || !session) return

    const { error: updateError, data: updateData } = await supabase
      .from('pages')
      .update({ custom_id: input.customId })
      .eq('id', input.pageId)
      .eq('owner_id', session.user.id)
      .select('id')

    if (updateError || !updateData.length) return

    await revalidateServer(
      ctx as inferAsyncReturnType<typeof createContext>, 
      input.joinId
    )
  })
