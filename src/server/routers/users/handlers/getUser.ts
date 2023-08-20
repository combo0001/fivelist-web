import { UserSchemaRequest, UserSchemaResponse } from '@/lib/schemas/UserSchema'
import { procedure } from '@/server/trpc'
import * as crypto from 'node:crypto'

export const getUser = procedure
  .input(UserSchemaRequest)
  .output(UserSchemaResponse)
  .query(async ({ ctx }) => {
    const { supabase, session } = ctx

    if (!supabase || !session) return null

    const { data: fetchData } = await supabase
      .from('users')
      .select('id, custom_id, created_at')
      .eq('id', session.user.id)

    let [user] = fetchData || []

    if (!user) {
      let customId: string | null = null

      while (!customId) {
        const generatedCustomId = crypto.randomBytes(8).toString('hex')
        const { data } = await supabase
          .from('users')
          .select('id')
          .eq('custom_id', generatedCustomId)

        if (!data?.length) {
          customId = generatedCustomId
        }
      }

      const { data: insertConsult, error: insertError } = await supabase
        .from('users')
        .insert({ id: session.user.id, custom_id: customId })
        .select('id, custom_id, created_at')

      if (insertError) return null

      user = insertConsult[0]
    }

    const { id, custom_id: customId, created_at: createdAt } = user
    const { email, user_metadata: userMetadata } = session.user
    const createdAtDate = createdAt ? new Date(createdAt) : new Date()

    return {
      id,
      customId,
      email: email as string,
      name: userMetadata.full_name,
      createdAt: createdAtDate.toISOString(),
    }
  })
