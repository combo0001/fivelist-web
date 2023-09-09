import { z } from 'zod'

export const PasswordSchema = z
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

export type PasswordSchemaType = z.infer<typeof PasswordSchema>
