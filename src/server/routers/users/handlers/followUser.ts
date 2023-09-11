import { procedure } from '@/server/trpc'
import { z } from 'zod'
import { UserIdSchema } from '@/schemas/users/CredentialsSchema'
import { inferAsyncReturnType } from '@trpc/server'
import { createContext } from '@/server/context'
import { revalidateUser } from '../utils/revalidateUser'

const UserFollowInputSchema = z.object({
  userId: UserIdSchema,
})

const UserFollowOutputSchema = z.boolean()

export const followUser = procedure
  .input(UserFollowInputSchema)
  .output(UserFollowOutputSchema)
  .mutation(async ({ input, ctx }) => {
    const { supabase, session } = ctx

    if (!supabase || !session) return false
    if (session.user.id === input.userId) return false

    const { status } = await supabase.from('user_follows')
      .insert({
        author_id: session.user.id,
        user_id: input.userId,
      })
    
    await revalidateUser(
      ctx as inferAsyncReturnType<typeof createContext>, 
      { id: input.userId }
    )

    return status === 201
  })
