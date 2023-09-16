import { DiscordIcon } from "@/components/Icons"

const CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID as string
const CLIENT_SECRET = process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET as string

export const getRequestURL = (redirectURL: string): string => {
  return `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectURL + '/auth/user')}&response_type=code&scope=identify&state=DISCORD`
}

export const getPlatformIcon = (): React.ReactNode => {
  return (
    <DiscordIcon css={{ size: '$8', fill: '$white' }} />
  )
}

const exchangeTokenForCode = async (code: string): Promise<string | null> => {
  await new Promise(resolve => setTimeout(resolve, 5000))
  
  const body = JSON.stringify({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'authorization_code',
    code,
    redirect_uri: window.location.origin,
  })

  try {
    const result = await fetch('https://discord.com/oauth2/token/', {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
  
    const response = await result.json()

    if (!response.token_type || !response.access_token) return null

    return `${response.token_type} ${response.access_token}`
  } catch (_) {
    console.log(_)
    return null
  }
}

export const getUserIdentifier = async (fragment: URLSearchParams): Promise<string | null> => {
  const code = fragment.get('code')

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