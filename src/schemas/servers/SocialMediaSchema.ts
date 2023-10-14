import { z } from 'zod'
import { SocialMediaSchema } from '../SocialMediaSchema'

export const ServerSocialMediaSchema = z.object({
  socialMedia: SocialMediaSchema,
  profileId: z.string().max(64),
})

export type ServerSocialMediaSchemaType = z.infer<
  typeof ServerSocialMediaSchema
>

export const ServerSocialMediaListSchema = z.array(ServerSocialMediaSchema)

export type ServerSocialMediaListSchemaType = z.infer<
  typeof ServerSocialMediaListSchema
>
