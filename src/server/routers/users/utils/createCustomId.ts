import { Database } from '@/@types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'
import * as crypto from 'node:crypto'

export const createCustomId = async (
  supabase: SupabaseClient<Database>,
): Promise<string> => {
  let customId: string | null = null

  while (!customId) {
    const generatedCustomId = crypto.randomBytes(8).toString('hex')
    const { data } = await supabase
      .from('users')
      .select('id')
      .eq('custom_id', generatedCustomId)

    if (!data?.length) {
      customId = generatedCustomId
    }
  }

  return customId
}
