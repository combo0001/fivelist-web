import { SocialMediaSchema } from '@/schemas/SocialMediaSchema'
import { createContext } from '@/server/context'
import { procedure } from '@/server/trpc'
import { inferAsyncReturnType } from '@trpc/server'
import { z } from 'zod'
import { revalidateServer } from '../utils/revalidateServer'
import { ServerJoinIdSchema } from '@/schemas/servers/IdentitySchema'
import { isUserValid } from '../../users/utils/isUserValid'

const ServerSocialMediaInputSchema = z.object({
  joinId: ServerJoinIdSchema,
  pageId: z.string().uuid(),
  socialMedia: SocialMediaSchema,
})

const ServerSocialMediaOutputSchema = z.void()

export const removeServerSocialMedia = procedure
  .input(ServerSocialMediaInputSchema)
  .output(ServerSocialMediaOutputSchema)
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

    const { error: deleteError } = await supabase
      .from('page_social_media')
      .delete()
      .eq('page_id', fetchData.id)
      .eq('social_media', input.socialMedia)

    if (deleteError) return

    await revalidateServer(
      ctx as inferAsyncReturnType<typeof createContext>,
      input.joinId,
    )
  })
