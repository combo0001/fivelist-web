import { z } from 'zod'

import { UserPageSchema } from './PageSchema'
import { UserCustomIdSchema, UserIdSchema } from './CredentialsSchema'
import { UserPlanTierSchema } from './PlanTierSchema'

export const UserProfileSchema = z.object({
  id: UserIdSchema,
  customId: UserCustomIdSchema,
  page: UserPageSchema,
  planTier: UserPlanTierSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export type UserProfileSchemaType = z.infer<typeof UserProfileSchema>
