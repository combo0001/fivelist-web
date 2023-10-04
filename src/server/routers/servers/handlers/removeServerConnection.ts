import { createContext } from '@/server/context'
import { procedure } from '@/server/trpc'
import { inferAsyncReturnType } from '@trpc/server'
import { z } from 'zod'
import { revalidateServer } from '../utils/revalidateServer'
import { ServerJoinIdSchema } from '@/schemas/servers/IdentitySchema'

const ServerConnectionInputSchema = z.object({
  joinId: ServerJoinIdSchema,
  pageId: z.string().uuid(),
  name: z.string().max(24),
})

const ServerConnectionOutputSchema = z.void()

export const removeServerConnection = procedure
  .input(ServerConnectionInputSchema)
  .output(ServerConnectionOutputSchema)
  .mutation(async ({ input, ctx }) => {
    const { supabase, session } = ctx

    if (!supabase || !session) return

    const { error: fetchError, data: fetchData } = await supabase
      .from('pages')
      .select('id')
      .eq('id', input.pageId)
      .eq('owner_id', session.user.id)
      .single()

    if (fetchError || !fetchData) return

    const { error: deleteError } = await supabase
      .from('page_connections')
      .delete()
      .eq('page_id', fetchData.id)
      .eq('name', input.name)

    if (deleteError) return

    await revalidateServer(
      ctx as inferAsyncReturnType<typeof createContext>, 
      input.joinId
    )
  })
