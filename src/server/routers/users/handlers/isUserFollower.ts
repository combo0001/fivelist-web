import { procedure } from '@/server/trpc'
import { z } from 'zod'
import { UserIdSchema } from '@/schemas/users/CredentialsSchema'
import { isUserValid } from '../utils/isUserValid'

const UserFollowInputSchema = z.object({
  userId: UserIdSchema,
})

const UserFollowOutputSchema = z.boolean()

export const isUserFollower = procedure
  .input(UserFollowInputSchema)
  .output(UserFollowOutputSchema)
  .query(async ({ input, ctx }) => {
    const { supabase, session } = ctx

    if (!supabase || !session || !isUserValid(session)) return false
    if (session.user.id === input.userId) return false

    const { count, error: selectError } = await supabase
      .from('user_follows')
      .select('*', { count: 'exact', head: true })
      .eq('author_id', session.user.id)
      .eq('user_id', input.userId)

    if (selectError) return false

    return count === 1
  })
