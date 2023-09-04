import { SocialMediaSchemaType } from "@/@types/schemas/SocialMediaSchema";

const SOCIAL_BASE_URL: { [key in SocialMediaSchemaType]: string } = {
  FACEBOOK: 'https://www.facebook.com/',
  INSTAGRAM: 'https://www.instagram.com/',
  TIKTOK: 'https://www.tiktok.com/',
  YOUTUBE: 'https://www.youtube.com/@',
  TWITCH: 'https://www.twitch.tv/',
  GITHUB: 'https://github.com/',
}

export const getSocialMediaLink = (socialMedia: SocialMediaSchemaType, profileId: string) => {
  return SOCIAL_BASE_URL[socialMedia] + profileId
}

export const getAvailableSocialMedia = (): SocialMediaSchemaType[] => {
  const availableSocialMedia = [] 

  for (const socialMedia in SOCIAL_BASE_URL) {
    availableSocialMedia.push(socialMedia)
  }

  return availableSocialMedia as SocialMediaSchemaType[]
}