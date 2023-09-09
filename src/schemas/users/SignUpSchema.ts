import { z } from 'zod'

import { UserNameSchema, UserEmailSchema } from './CredentialsSchema'
import { PasswordSchema } from './PasswordSchema'

export const UserSignUpSchema = z.object({
  name: UserNameSchema,
  email: UserEmailSchema,
  password: PasswordSchema,
})

export type UserSignUpSchemaType = z.infer<typeof UserSignUpSchema>
