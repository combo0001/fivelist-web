import { z } from 'zod'

export const SubscriptionAmount = z.number().min(1)

export const SubscriptionPlanObjectSchema = z.object({
  amount: SubscriptionAmount,
  backURL: z.string().url(),
})