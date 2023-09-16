import { UserIdentitySchema } from '@/schemas/users/IdentitySchema'
import { procedure } from '@/server/trpc'
import { z } from 'zod'
import { createCustomId } from '../utils/createCustomId'
import { getUserPlanTier } from '../utils/getUserPlanTier'

const UserInputSchema = z.undefined()
const UserOutputSchema = z.union([z.null(), UserIdentitySchema])

export const getUserIdentity = procedure
  .input(UserInputSchema)
  .output(UserOutputSchema)
  .query(async ({ ctx }) => {
    const { supabase, session } = ctx

    if (!supabase || !session) return null

    const { data: fetchData } = await supabase
      .from('users')
      .select('id, custom_id, created_at, updated_at')
      .eq('id', session.user.id)

    let [user] = fetchData || []

    if (!user) {
      const customId = await createCustomId(supabase)

      const { data: insertConsult, error: insertError } = await supabase
        .from('users')
        .insert({ id: session.user.id, custom_id: customId })
        .select('id, custom_id, created_at, updated_at')

      if (insertError) return null

      user = insertConsult[0]
    }

    const {
      id,
      custom_id: customId,
      created_at: createdAt,
      updated_at: updatedAt,
    } = user
    const { email, user_metadata: userMetadata } = session.user
    const planTier = await getUserPlanTier(supabase, id)

    // console.log((session.user as any).amr)

    return {
      id,
      customId,
      identity: {
        name: userMetadata.full_name,
        email: email as string,
      },
      planTier,
      createdAt: createdAt
        ? new Date(createdAt).toISOString()
        : new Date().toISOString(),
      updatedAt: updatedAt
        ? new Date(updatedAt).toISOString()
        : new Date().toISOString(),
    }
  })
