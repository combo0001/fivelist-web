import { z } from 'zod'

export const OfferEnumSchema = z.enum(['MONTHLY', 'QUARTERLY', 'YEARLY'])

export type OfferEnumSchemaType = z.infer<typeof OfferEnumSchema>

export const PrivilegeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
})

export type PrivilegeSchemaType = z.infer<typeof PrivilegeSchema>

export const PlanSchema = z.object({
  id: z.string(),
  tag: z.string().nullable().nullable(),
  price: z.record(OfferEnumSchema, z.number()),
  privileges: z.record(z.string(), z.boolean()),
})

export type PlanSchemaType = z.infer<typeof PlanSchema>
