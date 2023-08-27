import { z } from 'zod'

export const UserSocialMediaSchema = z.object({
  socialMedia: z.enum([
    'TWITCH',
    'YOUTUBE',
    'FACEBOOK',
    'TIKTOK',
    'GITHUB',
    'INSTAGRAM',
  ]),
  profileId: z.string(),
})

export type UserSocialMediaSchemaType = z.infer<typeof UserSocialMediaSchema>

export const UserSocialMediaListSchema = z.array(UserSocialMediaSchema)

export type UserSocialMediaListSchemaType = z.infer<
  typeof UserSocialMediaListSchema
>
