import { z } from 'zod'
import { ServerIdSchema, ServerJoinIdSchema } from './IdentitySchema'
import { ServerPageSchema } from './PageSchema'
import { ServerPlanTierSchema } from './PlanTierSchema'
import { UserPreviewSchema } from '../users/PreviewSchema'

export const ServerProfileSchema = z.object({
  id: ServerIdSchema,
  joinId: ServerJoinIdSchema,
  page: ServerPageSchema,
  planTier: ServerPlanTierSchema,
  ownerUser: UserPreviewSchema.nullable(),
  createdAt: z.string().datetime(),
})

export type ServerProfileSchemaType = z.infer<typeof ServerProfileSchema>
