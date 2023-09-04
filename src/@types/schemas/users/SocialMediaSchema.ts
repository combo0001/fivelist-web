import { z } from 'zod'
import { SocialMediaSchema } from '../SocialMediaSchema'

export const UserSocialMediaSchema = z.object({
  socialMedia: SocialMediaSchema,
  profileId: z.string().max(64),
})

export type UserSocialMediaSchemaType = z.infer<typeof UserSocialMediaSchema>

export const UserSocialMediaListSchema = z.array(UserSocialMediaSchema)

export type UserSocialMediaListSchemaType = z.infer<
  typeof UserSocialMediaListSchema
>
