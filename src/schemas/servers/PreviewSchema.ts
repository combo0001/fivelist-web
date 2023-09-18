import { z } from 'zod'
import { ServerJoinIdSchema, ServerIdSchema } from './IdentitySchema'

import { ServerPlanTierSchema } from './PlanTierSchema'
import { ServerDescriptionSchema } from './PageSchema'

const ServerPreviewStatisticSchema = z.object({
  likes: z.number().int(),
  followers: z.number().int(),
  reviews: z.number().int(),
})

export const ServerPreviewSchema = z.object({
  joinId: ServerJoinIdSchema,
  description: ServerDescriptionSchema.nullable(),
  statistic: ServerPreviewStatisticSchema,
  planTier: ServerPlanTierSchema,
  createdAt: z.string().datetime(),
})

export type ServerPreviewSchemaType = z.infer<typeof ServerPreviewSchema>

export const ServerPreviewsSchema = z.array(ServerPreviewSchema)

export type ServerPreviewsSchemaType = z.infer<typeof ServerPreviewsSchema>
