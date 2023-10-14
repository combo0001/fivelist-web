import { Database } from '@/@types/supabase'
import { UserPreviewSchemaType } from '@/schemas/users/PreviewSchema'
import { SupabaseClient } from '@supabase/supabase-js'
import { getUserPlanTier } from '../../users/utils/getUserPlanTier'

export const getServerOwner = async (
  supabase: SupabaseClient<Database>,
  ownerId: string | null,
): Promise<UserPreviewSchemaType | null> => {
  if (!ownerId) return null

  const { data, error } = await supabase
    .from('users')
    .select(
      `
      id, 
      customId: custom_id, 
      createdAt: created_at,
      updatedAt: updated_at
    `,
    )
    .eq('id', ownerId)

  if (error || !data.length) return null

  const user = data[0]
  const planTier = await getUserPlanTier(supabase, user.id)

  const {
    data: { user: authUser },
    error: authError,
  } = await supabase.auth.admin.getUserById(user.id)

  if (authError || !authUser) return null

  const { user_metadata: userMetadata } = authUser

  return {
    ...user,
    planTier,
    name: userMetadata.full_name,
    createdAt: new Date(user.createdAt).toISOString(),
    updatedAt: new Date(user.updatedAt).toISOString(),
  }
}
