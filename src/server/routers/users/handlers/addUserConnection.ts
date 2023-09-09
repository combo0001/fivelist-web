import { UserConnectionSchema } from '@/schemas/users/ConnectionsSchema'
import { createContext } from '@/server/context'
import { procedure } from '@/server/trpc'
import { inferAsyncReturnType } from '@trpc/server'
import { z } from 'zod'

const UserConnectionInputSchema = UserConnectionSchema

const UserConnectionOutputSchema = z.void()

export const addUserConnection = procedure
  .input(UserConnectionInputSchema)
  .output(UserConnectionOutputSchema)
  .mutation(async ({ input, ctx }) => {
    const { supabase, session } = ctx

    if (!supabase || !session) return

    const { error: upsertError } = await supabase.from('user_connections')
      .upsert({
        user_id: session.user.id,
        connection: input.connection,
        identifier: input.identifier,
      })

    if (upsertError) return 

    const { res } = ctx as inferAsyncReturnType<typeof createContext>

    if (res) {
      const { data, error: selectError } = await supabase
        .from('users')
        .select('customId:custom_id')
        .eq('id', session.user.id)

      if (selectError) return

      const user = data[0]

      if (user) {
        res.revalidate(`/users/${user.customId}`).catch(() => {})
      }
    }
  })
