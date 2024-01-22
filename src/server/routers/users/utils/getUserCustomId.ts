import { Database } from '@/@types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

export const getUserCustomId = async (
  supabase: SupabaseClient<Database>,
  userId: string,
): Promise<string | null> => {
  const { data: selectData, error: selectError } = await supabase
    .from('users')
    .select('customId:custom_id')
    .eq('id', userId)
    .single()

  if (selectError) return null

  return selectData.customId
}
