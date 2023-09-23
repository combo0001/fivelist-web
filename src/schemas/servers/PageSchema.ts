import { z } from 'zod'
import { ServerConnectionsListSchema } from './ConnectionsSchema'
import { ServerSocialMediaListSchema } from './SocialMediaSchema'
import { ServerStatisticSchema } from './StatisticsSchema'
import { ServerCustomIdSchema, ServerIdSchema } from './IdentitySchema'
import { ServerPlanTierSchema } from './PlanTierSchema'
import { UserPreviewSchema } from '../users/PreviewSchema'

export const ServerDescriptionSchema = z.string().max(4096)
export const ServerImageUrlSchema = z.string().url().max(256)

export const ServerPageSchema = z.object({
  id: ServerIdSchema,
  customId: ServerCustomIdSchema,
  bannerURL: ServerImageUrlSchema.nullable(),
  description: ServerDescriptionSchema.nullable(),
  socialMedia: ServerSocialMediaListSchema,
  connections: ServerConnectionsListSchema, 
  statistics: ServerStatisticSchema,
  planTier: ServerPlanTierSchema,
  ownerUser: UserPreviewSchema.nullable(),
})

export type ServerPageSchemaType = z.infer<typeof ServerPageSchema>
