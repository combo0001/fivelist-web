import { z } from 'zod'
import { UserPreviewSchema } from '../users/PreviewSchema'
import { OfferEnumSchema } from '../PremiumSchema'
import { ServerIdSchema } from '../servers/IdentitySchema'
import { PayerSchema } from './PayerSchema'
import { PayerPaymentMethodEnum } from './PayerPaymentMethodSchema'

export const OrderIdSchema = z.string().uuid()
export const OrderDataSchema = z.object({
  pageId: ServerIdSchema.optional(),
  planId: z.string(),
  offer: OfferEnumSchema,
})
export const PaymentDataSchema = z.object({
  payer: PayerSchema,
  paymentMethod: PayerPaymentMethodEnum
})

export type OrderIdSchemaType = z.infer<typeof OrderIdSchema>
export type OrderDataSchemaType = z.infer<typeof OrderDataSchema>
export type PaymentDataSchemaType = z.infer<typeof PaymentDataSchema>

export const OrderSchema = z.object({
  id: OrderIdSchema,
  ownerUser: UserPreviewSchema, 
  transactionId: z.string().nullable(),
  orderData: OrderDataSchema,
  paymentData: PaymentDataSchema.nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export type OrderSchemaType = z.infer<typeof OrderSchema>