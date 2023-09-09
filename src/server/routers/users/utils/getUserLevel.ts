import { UserLevelSchemaType } from '@/schemas/users/LevelSchema'
import { Database } from '@/@types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

export const getUserLevel = async (
  supabase: SupabaseClient<Database>,
  userId: string,
): Promise<UserLevelSchemaType> => {
  return {
    currentLevel: {
      id: 2,
      extension: 1000,
      points: 2000,
    },
    nextLevel: {
      id: 3,
      extension: 1000,
      points: 3000,
    },
    points: 2455,
  }
}
