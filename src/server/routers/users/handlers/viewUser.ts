import { createContext } from '@/server/context'
import { procedure } from '@/server/trpc'
import { z } from 'zod'
import { UserIdSchema } from '@/schemas/users/CredentialsSchema'
import { revalidateUser } from '../utils/revalidateUser'
import { inferAsyncReturnType } from '@trpc/server'
import { isUserValid } from '../utils/isUserValid'

const UserViewInputSchema = z.object({
  userId: UserIdSchema,
})

const UserViewOutputSchema = z.boolean()

export const viewUser = procedure
  .input(UserViewInputSchema)
  .output(UserViewOutputSchema)
  .mutation(async ({ input, ctx }) => {
    const { supabase, session } = ctx

    if (!supabase || !session || !isUserValid(session)) return false
    if (session.user.id === input.userId) return false

    const { status } = await supabase.from('user_views')
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
