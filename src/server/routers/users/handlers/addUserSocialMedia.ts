import { UserSocialMediaSchema } from '@/@types/schemas/users/SocialMediaSchema'
import { createContext } from '@/server/context'
import { procedure } from '@/server/trpc'
import { inferAsyncReturnType } from '@trpc/server'
import { z } from 'zod'

const UserSocialMediaInputSchema = UserSocialMediaSchema

const UserSocialMediaOutputSchema = z.void()

export const addUserSocialMedia = procedure
  .input(UserSocialMediaInputSchema)
  .output(UserSocialMediaOutputSchema)
  .mutation(async ({ input, ctx }) => {
    const { supabase, session } = ctx

    if (!supabase || !session) return

    const { error: upsertError } = await supabase
      .from('user_social_media')
      .upsert({
        user_id: session.user.id,
        social_media: input.socialMedia,
        profile_id: input.profileId,
      })

    if (upsertError) return

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
