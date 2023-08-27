import { z } from 'zod'

import { UserConnectionListSchema } from './ConnectionsSchema'
import { UserLevelSchema } from './LevelSchema'
import { UserSocialMediaListSchema } from './SocialMediaSchema'
import { UserStatisticSchema } from './StatisticsSchema'
import { UserNameSchema } from './CredentialsSchema'

export const UserDescriptionSchema = z.string().max(4096)

export const UserStreamUrlSchema = z.string().max(256)
export const UserImageUrlSchema = z.string().max(256)

export const UserPageSchema = z.object({
  avatarURL: UserImageUrlSchema.nullable(),
  bannerURL: UserImageUrlSchema.nullable(),
  name: UserNameSchema,
  description: UserDescriptionSchema.nullable(),
  socialMedia: UserSocialMediaListSchema,
  connections: UserConnectionListSchema,
  statistics: UserStatisticSchema,
  level: UserLevelSchema,
  streamURL: UserStreamUrlSchema.nullable(),
  isOnline: z.boolean(),
})

export type UserPageSchemaType = z.infer<typeof UserPageSchema>
