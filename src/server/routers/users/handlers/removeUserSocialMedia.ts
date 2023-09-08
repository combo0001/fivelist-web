import { SocialMediaSchema } from '@/@types/schemas/SocialMediaSchema'
import { createContext } from '@/server/context'
import { procedure } from '@/server/trpc'
import { inferAsyncReturnType } from '@trpc/server'
import { z } from 'zod'

const UserSocialMediaInputSchema = z.object({
  socialMedia: SocialMediaSchema,
})

const UserSocialMediaOutputSchema = z.void()

export const removeUserSocialMedia = procedure
  .input(UserSocialMediaInputSchema)
  .output(UserSocialMediaOutputSchema)
  .mutation(async ({ input, ctx }) => {
    const { supabase, session } = ctx

    if (!supabase || !session) return

    const { error: deleteError } = await supabase
      .from('user_social_media')
      .delete()
      .eq('user_id', session.user.id)
      .eq('social_media', input.socialMedia)

    if (deleteError) return

    const { res } = ctx as inferAsyncReturnType<typeof createContext>

    if (res) {
      const { data, error: selectError } = await supabase
        .from('users')
        .select('customId:custom_id')
        .eq('id', session.user.id)

      if (selectError) return

      const user = data[0]

      if (user) {
        res.revalidate(`/users/${user.customId}`).catch(() => {})
      }
    }
  })
