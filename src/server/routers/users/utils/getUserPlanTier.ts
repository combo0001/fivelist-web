import { UserPlanTierSchemaType } from '@/schemas/users/PlanTierSchema'
import { Database } from '@/@types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

export const getUserPlanTier = async (
  supabase: SupabaseClient<Database>,
  userId: string,
): Promise<UserPlanTierSchemaType> => {
  return {
    id: 1,
    name: 'PREMIUM_TIER',
    privileges: {
      PROFILE_CUSTOM_ID: true,
      PROFILE_HEADER: true,
      PROFILE_DESCRIPTION: true,
      DOUBLE_LIKE: true,
    },
  }
}
