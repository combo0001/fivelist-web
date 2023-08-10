import { SignUpRequestSchema } from '@/lib/schemas/SignUpSchema'
import createClient from '@/lib/supabase/supabase-server'
import * as crypto from 'node:crypto'

import { procedure, router } from '../trpc'

export const usersRouter = router({
  signup: procedure.input(SignUpRequestSchema).query(async ({ input, ctx }) => {
    const { email, password, name } = input

    const supabase = createClient()

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    })

    if (authError) {
      return {
        status: authError.status,
        data: authError.message,
      }
    }

    let customId: string | null = null

    while (!customId) {
      const generatedCustomId = crypto.randomBytes(8).toString('hex')
      const { data } = await supabase
        .from('users')
        .select()
        .eq('custom_id', generatedCustomId)

      if (!data?.length) {
        customId = generatedCustomId
      }
    }

    const { status: insertStatus, error: insertError } = await supabase
      .from('users')
      .insert({
        id: authData.user?.id,
        custom_id: customId,
      })

    if (insertError) {
      return {
        status: insertStatus,
        data: insertError.message,
      }
    }

    return {
      status: 200,
      data: authData,
    }
  }),
})
