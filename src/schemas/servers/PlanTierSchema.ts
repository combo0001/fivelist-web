import { z } from 'zod'

export const ServerPlanTierSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  privileges: z.record(z.boolean()),
})

export type ServerPlanTierSchemaType = z.infer<typeof ServerPlanTierSchema>
