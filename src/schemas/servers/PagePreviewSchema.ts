import { z } from 'zod'
import { ServerIdSchema } from './IdentitySchema'

import { ServerPlanTierSchema } from './PlanTierSchema'
import { ServerDescriptionSchema } from './PageSchema'

const ServerPreviewStatisticSchema = z.object({
  likes: z.number().int(),
  followers: z.number().int(),
  reviews: z.number().int(),
})

export const ServerPagePreviewSchema = z.object({
  id: ServerIdSchema,
  description: ServerDescriptionSchema.nullable(),
  statistic: ServerPreviewStatisticSchema,
  planTier: ServerPlanTierSchema,
})

export type ServerPagePreviewSchemaType = z.infer<
  typeof ServerPagePreviewSchema
>
