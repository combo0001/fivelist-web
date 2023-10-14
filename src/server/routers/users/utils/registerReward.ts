import { Database } from '@/@types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

interface ActivityProps {
  userId: string
  message: string
  points?: number
}

export const registerActivity = async (
  supabase: SupabaseClient<Database>,
  { message, points = 0, userId }: ActivityProps,
): Promise<void> => {
  await supabase.from('user_activities').insert({
    user_id: userId,
    message,
    points,
  })
}
