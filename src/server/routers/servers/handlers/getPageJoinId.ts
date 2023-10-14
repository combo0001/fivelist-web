/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Database } from '@/@types/supabase'
import { procedure } from '@/server/trpc'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'
import { ServerCustomIdSchema } from '@/schemas/servers/IdentitySchema'

const ServerPageInputSchema = z.object({
  customId: ServerCustomIdSchema,
})

const ServerPageOutputSchema = z.union([z.null(), z.string()])

export const getPageJoinId = procedure
  .input(ServerPageInputSchema)
  .output(ServerPageOutputSchema)
  .query(async ({ ctx, input }) => {
    let { supabase } = ctx

    if (!supabase) {
      supabase = createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false,
          },
        },
      )
    }

    const { data: fetchPageData, error: fetchPageError } = await supabase
      .from('pages')
      .select('id')
      .eq('custom_id', input.customId)
      .single()

    if (fetchPageError || !fetchPageData) return null

    const serverPageId = fetchPageData.id

    const { data: fetchServerData, error: fetchServerError } = await supabase
      .from('servers')
      .select(
        `
        joinId:id
      `,
      )
      .eq('page_id', serverPageId)
      .single()

    if (fetchServerError || !fetchServerData) return null

    return fetchServerData.joinId
  })
