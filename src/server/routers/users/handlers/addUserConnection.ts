import { UserConnectionSchema } from '@/schemas/users/ConnectionsSchema'
import { createContext } from '@/server/context'
import { procedure } from '@/server/trpc'
import { inferAsyncReturnType } from '@trpc/server'
import { z } from 'zod'
import { registerActivity } from '../utils/registerReward'
import { revalidateUser } from '../utils/revalidateUser'
import { isUserValid } from '../utils/isUserValid'

const UserConnectionInputSchema = UserConnectionSchema

const UserConnectionOutputSchema = z.void()

export const addUserConnection = procedure
  .input(UserConnectionInputSchema)
  .output(UserConnectionOutputSchema)
  .mutation(async ({ input, ctx }) => {
    const { supabase, session } = ctx

    if (!supabase || !session || !isUserValid(session)) return

    const { error: upsertError } = await supabase
      .from('user_connections')
      .upsert({
        user_id: session.user.id,
        connection: input.connection,
        identifier: input.identifier,
      })

    if (upsertError) return

    await registerActivity(supabase, {
      userId: session.user.id,
      message: `Conexão com ${input.connection} adicionada`,
      points: 10,
    })
    await revalidateUser(ctx as inferAsyncReturnType<typeof createContext>, {
      id: session.user.id,
    })
  })
