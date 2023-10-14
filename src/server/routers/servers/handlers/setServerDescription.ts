import { createContext } from '@/server/context'
import { procedure } from '@/server/trpc'
import { inferAsyncReturnType } from '@trpc/server'
import { z } from 'zod'
import { revalidateServer } from '../utils/revalidateServer'
import { ServerJoinIdSchema } from '@/schemas/servers/IdentitySchema'
import { ServerDescriptionSchema } from '@/schemas/servers/PageSchema'
import { isUserValid } from '../../users/utils/isUserValid'

const ServerDescriptionInputSchema = z.object({
  joinId: ServerJoinIdSchema,
  pageId: z.string().uuid(),
  description: ServerDescriptionSchema,
})

const ServerDescriptionOutputSchema = z.void()

export const setServerDescription = procedure
  .input(ServerDescriptionInputSchema)
  .output(ServerDescriptionOutputSchema)
  .mutation(async ({ input, ctx }) => {
    const { supabase, session } = ctx

    if (!supabase || !session || !isUserValid(session)) return

    const { error: updateError, data: updateData } = await supabase
      .from('pages')
      .update({ description: input.description })
      .eq('id', input.pageId)
      .eq('owner_id', session.user.id)
      .select('id')

    if (updateError || !updateData.length) return

    await revalidateServer(
      ctx as inferAsyncReturnType<typeof createContext>,
      input.joinId,
    )
  })
