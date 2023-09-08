import { DiscordIcon } from "@/components/Icons"

const CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID as string
const CLIENT_SECRET = process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET as string

export const getRequestURL = (redirectURL: string): string => {
  return `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectURL + '/')}&response_type=code&scope=identify`
}

export const getPlatformIcon = (): React.ReactNode => {
  return (
    <DiscordIcon css={{ size: '$8', fill: '$white' }} />
  )
}