import { PasswordSchema } from '@/schemas/users/PasswordSchema'
import { Database } from '@/@types/supabase'
import { procedure } from '@/server/trpc'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

const UserPasswordInputSchema = z.object({
  code: z.string(),
  password: PasswordSchema
})

const UserPasswordOutputSchema = z.void()

export const setUserPassword = procedure
  .input(UserPasswordInputSchema)
  .output(UserPasswordOutputSchema)
  .mutation(async ({ input, ctx }) => {
    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    )

    const { data: exchangeData, error: exchangeError } = await supabase.auth.exchangeCodeForSession(input.code)

    if (exchangeError) return

    const { error: sessionError } = await supabase.auth.setSession(exchangeData.session)
    
    if (sessionError) return 

    await supabase.auth.updateUser({ password: input.password })
  })
