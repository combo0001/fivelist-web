import { SocialMediaSchema } from '@/schemas/SocialMediaSchema'
import { createContext } from '@/server/context'
import { procedure } from '@/server/trpc'
import { inferAsyncReturnType } from '@trpc/server'
import { z } from 'zod'
import { revalidateUser } from '../utils/revalidateUser'
import { isUserValid } from '../utils/isUserValid'

const UserSocialMediaInputSchema = z.object({
  socialMedia: SocialMediaSchema,
})

const UserSocialMediaOutputSchema = z.void()

export const removeUserSocialMedia = procedure
  .input(UserSocialMediaInputSchema)
  .output(UserSocialMediaOutputSchema)
  .mutation(async ({ input, ctx }) => {
    const { supabase, session } = ctx

    if (!supabase || !session || !isUserValid(session)) return

    const { error: deleteError } = await supabase
      .from('user_social_media')
      .delete()
      .eq('user_id', session.user.id)
      .eq('social_media', input.socialMedia)

    if (deleteError) return

    await revalidateUser(ctx as inferAsyncReturnType<typeof createContext>, {
      id: session.user.id,
    })
  })
