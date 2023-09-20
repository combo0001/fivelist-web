import { Database } from '@/@types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'
import { ServerPlanTierSchemaType } from '@/schemas/servers/PlanTierSchema'

export const getServerPlanTier = async (
  supabase: SupabaseClient<Database>,
  pageId: string | null,
): Promise<ServerPlanTierSchemaType> => {
  return {
    id: 3,
    name: 'BUSINESS_TIER',
    privileges: {
      PAGE_DESCRIPTION: true, 
      PAGE_BANNER: true, 
      REPLY_REVIEWS: true, 
      LIKE_SERVER_BOT: true, 
      PAGE_CUSTOM_ID: true, 
      LIKE_SERVER_SCRIPT: true, 
      PAGE_STATISTICS: true, 
      SERVER_STATISTICS: true, 
      MARKETING_SUPPORT: true, 
    },
  }
}
