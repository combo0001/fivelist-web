import { DiscordIcon } from "@/components/Icons"

const CLIENT_ID = process.env.NEXT_PUBLIC_STEAM_CLIENT_ID as string

export const getRequestURL = (redirectURL: string): string => {
  return `https://steamcommunity.com/oauth/login?response_type=token&client_id=${CLIENT_ID}&state=STEAM`
}

export const getPlatformIcon = (): React.ReactNode => {
  return (
    <DiscordIcon css={{ size: '$8', fill: '$white' }} />
  )
}

export const getUserIdentifier = async (fragment: URLSearchParams): Promise<string | null> => {
  return null
}