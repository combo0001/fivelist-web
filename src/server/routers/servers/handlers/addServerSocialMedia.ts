import { createContext } from '@/server/context'
import { procedure } from '@/server/trpc'
import { inferAsyncReturnType } from '@trpc/server'
import { z } from 'zod'
import { revalidateServer } from '../utils/revalidateServer'
import { ServerJoinIdSchema } from '@/schemas/servers/IdentitySchema'
import { ServerSocialMediaSchema } from '@/schemas/servers/SocialMediaSchema'

const ServerSocialMediaInputSchema = z.object({
  joinId: ServerJoinIdSchema,
  pageId: z.string().uuid(),
  ...ServerSocialMediaSchema.shape
})

const ServerSocialMediaOutputSchema = z.void()

export const addServerSocialMedia = procedure
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

    const { error: upsertError } = await supabase.from('page_social_media')
      .upsert({
        page_id: fetchData.id,
        social_media: input.socialMedia,
        profile_id: input.profileId,
      })  

    if (upsertError) return 

    await revalidateServer(
      ctx as inferAsyncReturnType<typeof createContext>, 
      input.joinId
    )
  })
