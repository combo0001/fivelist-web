import { z } from 'zod'

import {
  UserCustomIdSchema,
  UserEmailSchema,
  UserIdSchema,
  UserNameSchema,
} from './CredentialsSchema'
import { UserPlanTierSchema } from './PlanTierSchema'

export const UserIdentitySchema = z.object({
  id: UserIdSchema,
  customId: UserCustomIdSchema,
  identity: z.object({
    name: UserNameSchema,
    email: UserEmailSchema,
  }),
  planTier: UserPlanTierSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export type UserIdentitySchemaType = z.infer<typeof UserIdentitySchema>
