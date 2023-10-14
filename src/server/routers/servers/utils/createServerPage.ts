import { SupabaseClient } from '@supabase/supabase-js'
import { ServerPageType } from '../types'
import { Database } from '@/@types/supabase'

export const createServerPage = async (
  supabase: SupabaseClient<Database>,
  joinId: string,
): Promise<ServerPageType | null> => {
  const { data: insertPageData, error: insertPageError } = await supabase
    .from('pages')
    .insert({
      custom_id: joinId,
    }).select(`
      bannerUrl:banner_url,
      createdAt:created_at,
      customId:custom_id,
      ownerId:owner_id,
      socialMedia:page_social_media(
        socialMedia:social_media, 
        profileId:profile_id
      ),
      connections:page_connections(
        name,
        redirectURL:redirect_url
      ),
      description,
      followers,
      id,
      likes,
      reviews,
      views
    `)

  if (insertPageError || !insertPageData.length) return null

  const serverPage = insertPageData[0]
  const { error: updateServerError } = await supabase
    .from('servers')
    .update({
      page_id: serverPage.id,
    })
    .eq('id', joinId)

  if (updateServerError) return null

  return serverPage
}
