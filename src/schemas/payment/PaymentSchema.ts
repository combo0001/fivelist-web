import { z } from 'zod'
import { PayerObjectSchema } from './PayerSchema'

export const PaymentAmount = z.number().min(1)

export const PaymentObjectSchema = z.object({
  description: z.string(),
  type: PaymentTypeSchema,
  gateway: z.string(),
  amount: PaymentAmount,
  payer: PayerObjectSchema,
})