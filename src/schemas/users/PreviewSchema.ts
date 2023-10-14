import { z } from 'zod'

import {
  UserCustomIdSchema,
  UserIdSchema,
  UserNameSchema,
} from './CredentialsSchema'
import { UserPlanTierSchema } from './PlanTierSchema'

export const UserPreviewSchema = z.object({
  id: UserIdSchema,
  customId: UserCustomIdSchema,
  name: UserNameSchema,
  planTier: UserPlanTierSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export type UserPreviewSchemaType = z.infer<typeof UserPreviewSchema>
