import { UserPlanTierSchemaType } from '@/@types/schemas/users/PlanTierSchema'
import { Database } from '@/@types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

export const getUserPlanTier = async (
  supabase: SupabaseClient<Database>,
  userId: string,
): Promise<UserPlanTierSchemaType> => {
  return {
    PROFILE_CUSTOM_ID: true,
    PROFILE_HEADER: true,
    PROFILE_DESCRIPTION: true,
    DOUBLE_LIKE: true,
  }
}
