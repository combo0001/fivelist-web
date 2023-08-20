import { z } from 'zod'

import { nameSchema } from './SignUpSchema'

export const UserSchema = z.object({
  id: z.string().uuid(),
  customId: z.string().max(32),
  email: z.string().email(),
  name: nameSchema,
  createdAt: z.string().datetime(),
})

export type UserSchemaType = z.infer<typeof UserSchema>

export const UserSchemaRequest = z.undefined()

export type UserSchemaRequestType = z.infer<typeof UserSchemaRequest>

export const UserSchemaResponse = z.union([z.null(), UserSchema])

export type UserSchemaResponseType = z.infer<typeof UserSchemaResponse>
