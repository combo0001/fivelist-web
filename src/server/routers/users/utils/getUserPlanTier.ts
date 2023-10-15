import { UserPlanTierSchemaType } from '@/schemas/users/PlanTierSchema'
import { Database } from '@/@types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

export const getUserPlanTier = async (
  supabase: SupabaseClient<Database>,
  userId: string,
): Promise<UserPlanTierSchemaType> => {
  return {
    // id: 0,
    // name: 'FREE_TIER',
    // privileges: {},
    id: 1,
    name: 'PREMIUM_TIER',
    privileges: {
      PROFILE_BANNER: true,
      PROFILE_DESCRIPTION: true,
      DOUBLE_LIKE: true,
    },
  }
}
