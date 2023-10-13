import { z } from 'zod'

export const PayerIdentificationSchema = z.string().regex(/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/)

export const PayerIdentitySchema = z.object({
  identification: PayerIdentificationSchema,
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
})

export type PayerIdentitySchemaType = z.infer<typeof PayerIdentitySchema>