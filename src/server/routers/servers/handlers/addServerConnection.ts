import { createContext } from '@/server/context'
import { procedure } from '@/server/trpc'
import { inferAsyncReturnType } from '@trpc/server'
import { z } from 'zod'
import { revalidateServer } from '../utils/revalidateServer'
import { ServerJoinIdSchema } from '@/schemas/servers/IdentitySchema'
import { ServerConnectionSchema } from '@/schemas/servers/ConnectionsSchema'
import { isUserValid } from '../../users/utils/isUserValid'

const ServerConnectionInputSchema = z.object({
  joinId: ServerJoinIdSchema,
  pageId: z.string().uuid(),
  ...ServerConnectionSchema.shape
})

const ServerConnectionOutputSchema = z.void()

export const addServerConnection = procedure
  .input(ServerConnectionInputSchema)
  .output(ServerConnectionOutputSchema)
  .mutation(async ({ input, ctx }) => {
    const { supabase, session } = ctx

    if (!supabase || !session || !isUserValid(session)) return

    const { error: fetchError, data: fetchData } = await supabase
      .from('pages')
      .select('id')
      .eq('id', input.pageId)
      .eq('owner_id', session.user.id)
      .single()

    if (fetchError || !fetchData) return

    const { error: upsertError } = await supabase.from('page_connections')
      .upsert({
        page_id: fetchData.id,
        name: input.name,
        redirect_url: input.redirectURL,
      })  

    if (upsertError) return 

    await revalidateServer(
      ctx as inferAsyncReturnType<typeof createContext>, 
      input.joinId
    )
  })
