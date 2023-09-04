import { UserStreamUrlSchema } from '@/@types/schemas/users/PageSchema'
import { createContext } from '@/server/context'
import { procedure } from '@/server/trpc'
import { inferAsyncReturnType } from '@trpc/server'
import { z } from 'zod'

const UserStreamLinkInputSchema = z.object({
  streamURL: UserStreamUrlSchema,
})

const UserStreamLinkOutputSchema = z.void()

export const setUserStreamLink = procedure
  .input(UserStreamLinkInputSchema)
  .output(UserStreamLinkOutputSchema)
  .mutation(async ({ input, ctx }) => {
    const { supabase, session } = ctx

    if (!supabase || !session) return

    const { data: rowsData, error: updateError } = await supabase.from('users')
      .update({ stream_url: input.streamURL })
      .eq('id', session.user.id)
      .select('customId:custom_id')

    if (updateError) return

    const user = rowsData[0]
    const { res } = ctx as inferAsyncReturnType<typeof createContext>

    if (res) {
      res.revalidate(`/users/${user.customId}`).catch(() => {})
    }
  })
