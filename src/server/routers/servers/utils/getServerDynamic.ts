import { getServerEndpoint } from "@/services/Fivem";
import { ServerDynamicType } from "../types";

import { getServerDynamic as getServerDynamicObject } from '@/services/Fivem'

export const getServerDynamic = async (joinId: string): Promise<ServerDynamicType | null> => {
  const endpoint = await getServerEndpoint(joinId)

  if (!endpoint) return null 

  const serverDynamic = await getServerDynamicObject(endpoint)

  if (!serverDynamic) return null

  return {
    hostName: serverDynamic.hostname,
    playersCurrent: serverDynamic.clients,
    playersMax: serverDynamic.sv_maxclients,
  }
}