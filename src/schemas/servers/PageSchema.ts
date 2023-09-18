import { z } from 'zod'
import { ServerConnectionsListSchema } from './ConnectionsSchema'
import { ServerSocialMediaListSchema } from './SocialMediaSchema'
import { ServerStatisticSchema } from './StatisticsSchema'

export const ServerNameSchema = z.string()
export const ServerDescriptionSchema = z.string().max(4096)
export const ServerImageUrlSchema = z.string().url().max(256)

export const ServerPageSchema = z.object({
  bannerURL: ServerImageUrlSchema.nullable(),
  name: ServerNameSchema,
  description: ServerDescriptionSchema.nullable(),
  socialMedia: ServerSocialMediaListSchema,
  connections: ServerConnectionsListSchema, 
  statistics: ServerStatisticSchema,
})

export type ServerPageSchemaType = z.infer<typeof ServerPageSchema>
