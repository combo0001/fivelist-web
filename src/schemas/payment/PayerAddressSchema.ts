import { z } from 'zod'

export const AddressZipCodeSchema = z
  .string()
  .refine((value) => value.replace(/\D/g, '').length === 8)
  .transform((value) => value.replace(/\D/g, ''))

export const PayerAddressSchema = z.object({
  houseNumber: z.number(),
  street: z.string(),
  complement: z.string(),
  zipCode: AddressZipCodeSchema,
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
})

export type PayerAddressSchemaType = z.infer<typeof PayerAddressSchema>
