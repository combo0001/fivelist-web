import { UserBannerFile } from '@/schemas/users/BannerFileSchema'
import { createContext } from '@/server/context'
import { procedure } from '@/server/trpc'
import { inferAsyncReturnType } from '@trpc/server'
import { z } from 'zod'
import { revalidateUser } from '../utils/revalidateUser'
import { isUserValid } from '../utils/isUserValid'

const UserBannerInputSchema = z.object({
  imageURL: UserBannerFile,
})

const UserBannerOutputSchema = z.void()

export const setUserBanner = procedure
  .input(UserBannerInputSchema)
  .output(UserBannerOutputSchema)
  .mutation(async ({ input, ctx }) => {
    const { supabase, session } = ctx

    if (!supabase || !session || !isUserValid(session)) return

    const { data: rowsData, error: updateError } = await supabase
      .from('users')
      .update({ banner_url: input.imageURL })
      .eq('id', session.user.id)
      .select('customId:custom_id')

    if (updateError) return

    const user = rowsData[0]

    await revalidateUser(
      ctx as inferAsyncReturnType<typeof createContext>, 
      { customId: user.customId }
    )
  })
