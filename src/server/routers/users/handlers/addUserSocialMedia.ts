import { UserSocialMediaSchema } from '@/schemas/users/SocialMediaSchema'
import { createContext } from '@/server/context'
import { procedure } from '@/server/trpc'
import { inferAsyncReturnType } from '@trpc/server'
import { z } from 'zod'
import { revalidateUser } from '../utils/revalidateUser'

const UserSocialMediaInputSchema = UserSocialMediaSchema

const UserSocialMediaOutputSchema = z.void()

export const addUserSocialMedia = procedure
  .input(UserSocialMediaInputSchema)
  .output(UserSocialMediaOutputSchema)
  .mutation(async ({ input, ctx }) => {
    const { supabase, session } = ctx

    if (!supabase || !session || !isUserValid(session)) return

    const { error: upsertError } = await supabase
      .from('user_social_media')
      .upsert({
        user_id: session.user.id,
        social_media: input.socialMedia,
        profile_id: input.profileId,
      })

    if (upsertError) return

    await revalidateUser(
      ctx as inferAsyncReturnType<typeof createContext>, 
      { id: session.user.id }
    )
  })
