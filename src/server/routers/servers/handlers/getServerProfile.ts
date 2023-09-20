import { Database } from '@/@types/supabase'
import { procedure } from '@/server/trpc'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'
import { ServerProfileSchema } from '@/schemas/servers/ProfileSchema'
import { ServerJoinIdSchema } from '@/schemas/servers/IdentitySchema'

const ServerListInputSchema = z.object({
  joinId: ServerJoinIdSchema,
})

const ServerListOutputSchema = z.union([z.null(), ServerProfileSchema])

export const getServerList = procedure
  .input(ServerListInputSchema)
  .output(ServerListOutputSchema)
  .query(async ({ ctx }) => {
    let { supabase } = ctx

    if (!supabase) {
      supabase = createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
      )
    }

    return null
  })
