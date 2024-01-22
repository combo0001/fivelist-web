import { z } from 'zod'

export const SocialMediaSchema = z.enum([
  'TWITCH',
  'YOUTUBE',
  'FACEBOOK',
  'TIKTOK',
  'GITHUB',
  'INSTAGRAM',
  'DISCORD',
  'STEAM',
])

export type SocialMediaSchemaType = z.infer<typeof SocialMediaSchema>
