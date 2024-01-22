import { DiscordIcon } from '@/components/Icons'
import { getBaseURL } from '@/utils/getBaseURL'
import { NextApiRequest } from 'next'

const CLIENT_ID = process.env.DISCORD_CLIENT_ID as string
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET as string

const getRedirectURI = (): string => {
  return getBaseURL() + '/api/auth/discord'
}

export const getRequestURL = (): string => {
  const redirectURI = getRedirectURI()

  return `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    redirectURI,
  )}&response_type=code&scope=identify&state=DISCORD`
}

export const getDiscordCode = (endpoint: string): string | null => {
  const BASE_URL = getBaseURL()
  const fragment = new URL(`${BASE_URL}${endpoint}`).searchParams

  return fragment.get('code')
}

const exchangeTokenForCode = async (code: string): Promise<string | null> => {
  const formBody = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'authorization_code',
    redirect_uri: getRedirectURI(),
    scope: 'identify',
    code,
  })

  try {
    const result = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      body: formBody.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    const response = await result.json()

    if (!response.token_type || !response.access_token) return null

    return `${response.token_type} ${response.access_token}`
  } catch (_) {
    return null
  }
}

export const getUserIdentifier = async (
  req: NextApiRequest,
): Promise<string | null> => {
  const code = getDiscordCode(req.url as string)

  if (!code) return null

  try {
    const accessToken = await exchangeTokenForCode(code)

    if (!accessToken) return null

    const result = await fetch('https://discord.com/api/users/@me', {
      headers: {
        authorization: accessToken,
      },
    })

    const response = await result.json()

    return response?.id || null
  } catch (_) {
    return null
  }
}
