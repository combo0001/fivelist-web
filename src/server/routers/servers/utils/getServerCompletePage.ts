import { ServerPageSchemaType } from "@/schemas/servers/PageSchema";
import { ServerPageType } from "../types";
import { Database } from "@/@types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { getServerPlanTier } from "./getServerPlanTier";
import { getServerOwner } from "./getServerOwner";

export const getServerCompletePage = async (
  supabase: SupabaseClient<Database>, 
  page: ServerPageType
): Promise<ServerPageSchemaType> => {
  const bannerURL = page.bannerUrl || null

  const planTier = await getServerPlanTier(supabase, page.id)
  const ownerUser = await getServerOwner(supabase, page.ownerId)

  return {
    id: page.id,
    customId: page.customId,
    bannerURL,
    description: page.description,
    ownerUser,
    statistics: {
      followers: page.followers,
      likes: page.likes,
      views: page.views,
      reviews: page.reviews,
    },
    connections: [],
    socialMedia: [],
    planTier
  }
}