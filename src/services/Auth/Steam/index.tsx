import { DiscordIcon } from '@/components/Icons'
import { getBaseURL } from '@/utils/getBaseURL'
import { NextApiRequest } from 'next'
import SteamAuth from 'node-steam-openid'

const getSteamAuthenticator = (): SteamAuth => {
  const BASE_URL = getBaseURL()

  const steam = new SteamAuth({
    realm: BASE_URL,
    returnUrl: `${BASE_URL}/api/auth/steam`,
    apiKey: process.env.STEAM_CLIENT_ID as string,
  })

  return steam
}

export const getRequestURL = (): Promise<string> => {
  const steam = getSteamAuthenticator()

  return steam.getRedirectUrl()
}

export const getSteamHexById = (steamId: string): string => {
  return BigInt(steamId).toString(16)
}

export const getUserIdentifier = async (
  req: NextApiRequest,
): Promise<string | null> => {
  const steam = getSteamAuthenticator()

  try {
    const steamProfile = await steam.authenticate(req)

    if (!steamProfile) return null

    return steamProfile.steamid
  } catch (err) {
    return null
  }
}
