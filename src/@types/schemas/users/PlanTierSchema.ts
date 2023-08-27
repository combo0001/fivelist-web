import { z } from 'zod'

export const UserPlanTierSchema = z.record(z.boolean())

export type UserPlanTierSchemaType = z.infer<typeof UserPlanTierSchema>
