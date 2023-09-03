import { UserBannerFile } from '@/@types/schemas/users/BannerFileSchema'
import { createContext } from '@/server/context'
import { procedure } from '@/server/trpc'
import { inferAsyncReturnType } from '@trpc/server'
import { z } from 'zod'

const UserBannerInputSchema = z.object({
  fileURL: UserBannerFile,
})

const UserBannerOutputSchema = z.boolean()

export const setUserBanner = procedure
  .input(UserBannerInputSchema)
  .output(UserBannerOutputSchema)
  .mutation(async ({ input, ctx }) => {
    const { supabase, session } = ctx

    if (!supabase || !session) return false

    const { data: rowsData, error: updateError } = await supabase.from('users').update({ banner_url: input.fileURL }).eq('id', session.user.id).select()

    if (updateError) {
      return false
    }

    const user = rowsData[0]
    const { res } = ctx as inferAsyncReturnType<typeof createContext>

    if (res) {
      res.revalidate(`/users/${user.custom_id}`).catch(() => {})
    }

    return true
  })
