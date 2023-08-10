import { z } from 'zod'

export const SignInSchema = z.object({
  email: z.string().email('E-mail invalido.'),
  password: z.string(),
})

export type SignInSchemaType = z.infer<typeof SignInSchema>
