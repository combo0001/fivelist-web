import { UserIdentitySchema } from '@/schemas/users/IdentitySchema'
import { procedure } from '@/server/trpc'
import { z } from 'zod'
import { createCustomId } from '../utils/createCustomId'
import { getUserPlanTier } from '../utils/getUserPlanTier'
import { isUserValid } from '../utils/isUserValid'

const UserInputSchema = z.undefined()
const UserOutputSchema = z.union([z.null(), UserIdentitySchema])

export const getUserIdentity = procedure
  .input(UserInputSchema)
  .output(UserOutputSchema)
  .query(async ({ ctx }) => {
    const { supabase, session } = ctx

    if (!supabase || !session || !isUserValid(session)) return null

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

    return {
      id,
      customId,
      identity: {
        name: userMetadata.full_name,
        email: email as string,
      },
      planTier,
      createdAt: new Date(createdAt).toISOString(),
      updatedAt: new Date(updatedAt).toISOString(),
    }
  })
