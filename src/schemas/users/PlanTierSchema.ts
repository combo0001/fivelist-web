import { z } from 'zod'

export const UserPlanTierSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  privileges: z.record(z.boolean()),
})

export type UserPlanTierSchemaType = z.infer<typeof UserPlanTierSchema>
