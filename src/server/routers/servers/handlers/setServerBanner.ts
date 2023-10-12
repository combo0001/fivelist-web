import { createContext } from '@/server/context'
import { procedure } from '@/server/trpc'
import { inferAsyncReturnType } from '@trpc/server'
import { z } from 'zod'
import { ServerJoinIdSchema } from '@/schemas/servers/IdentitySchema'
import { ServerImageUrlSchema } from '@/schemas/servers/PageSchema'
import { revalidateServer } from '../utils/revalidateServer'

const ServerBannerInputSchema = z.object({
  joinId: ServerJoinIdSchema,
  pageId: z.string().uuid(),
  imageURL: ServerImageUrlSchema,
})

const ServerBannerOutputSchema = z.void()

export const setServerBanner = procedure
  .input(ServerBannerInputSchema)
  .output(ServerBannerOutputSchema)
  .mutation(async ({ input, ctx }) => {
    const { supabase, session } = ctx

    if (!supabase || !session || !isUserValid(session)) return

    const { data: updateData, error: updateError } = await supabase
      .from('pages')
      .update({ banner_url: input.imageURL })
      .eq('id', input.pageId)
      .eq('owner_id', session.user.id)
      .select('id')

    if (updateError || !updateData.length) return

    await revalidateServer(
      ctx as inferAsyncReturnType<typeof createContext>, 
      input.joinId
    )
  })
