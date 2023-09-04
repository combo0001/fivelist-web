import { UserSocialMediaListSchemaType } from '@/@types/schemas/users/SocialMediaSchema'
import { Database } from '@/@types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

export const getUserPlanTier = async (
  supabase: SupabaseClient<Database>,
  userId: string,
): Promise<UserSocialMediaListSchemaType> => {
  const { data, error } = await supabase.from('user_social_media')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true })

  return []
}
