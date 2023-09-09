import { z } from 'zod'

export const SocialMediaSchema = z.enum([
  'TWITCH',
  'YOUTUBE',
  'FACEBOOK',
  'TIKTOK',
  'GITHUB',
  'INSTAGRAM',
])

export type SocialMediaSchemaType = z.infer<typeof SocialMediaSchema>
