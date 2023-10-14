import { z } from 'zod'
import { PayerIdentitySchema } from './PayerIdentitySchema'
import { PayerAddressSchema } from './PayerAddressSchema'

export const PayerSchema = z.object({
  ...PayerIdentitySchema.shape,
  address: PayerAddressSchema,
})

export type PayerSchemaType = z.infer<typeof PayerSchema>
