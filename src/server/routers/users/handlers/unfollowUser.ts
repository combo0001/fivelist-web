import { procedure } from '@/server/trpc'
import { z } from 'zod'
import { UserIdSchema } from '@/schemas/users/CredentialsSchema'
import { inferAsyncReturnType } from '@trpc/server'
import { createContext } from '@/server/context'
import { revalidateUser } from '../utils/revalidateUser'
import { isUserValid } from '../utils/isUserValid'

const UserUnfollowInputSchema = z.object({
  userId: UserIdSchema,
})

const UserUnfollowOutputSchema = z.boolean()

export const unfollowUser = procedure
  .input(UserUnfollowInputSchema)
  .output(UserUnfollowOutputSchema)
  .mutation(async ({ input, ctx }) => {
    const { supabase, session } = ctx

    if (!supabase || !session || !isUserValid(session)) return false
    if (session.user.id === input.userId) return false

    const { status } = await supabase
      .from('user_follows')
      .delete()
      .eq('author_id', session.user.id)
      .eq('user_id', input.userId)

    await revalidateUser(ctx as inferAsyncReturnType<typeof createContext>, {
      id: input.userId,
    })

    return status === 204
  })
