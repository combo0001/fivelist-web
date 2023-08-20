import { z } from 'zod'

const passwordSchema = z
  .string()
  .min(8, 'A senha deve ter pelo menos 8 caracteres')
  .refine(
    (value) => {
      const hasLowerCase = /[a-z]/.test(value)
      const hasUpperCase = /[A-Z]/.test(value)
      const hasNumber = /\d/.test(value)

      return value.length >= 8 && hasLowerCase && hasUpperCase && hasNumber
    },
    {
      message: 'A senha deve incluir maiúsculas, minúsculas e números.',
    },
  )

export const nameSchema = z
  .string()
  .min(4, 'O nome é pequeno demais')
  .max(64, 'O nome é grande demais')
  .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]+)*$/, 'O nome é inválido')

export const SignUpRequestSchema = z.object({
  name: nameSchema,
  email: z.string().email('E-mail inválido'),
  password: passwordSchema,
})

export type SignUpRequestSchemaType = z.infer<typeof SignUpRequestSchema>

export const SignUpResponseSchema = z.object({})

export type SignUpResponseSchemaType = z.infer<typeof SignUpResponseSchema>
