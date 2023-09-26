import { Database } from '@/@types/supabase'
import { ServerPreviewsSchema, ServerPreviewsSchemaType } from '@/schemas/servers/PreviewSchema'
import { procedure } from '@/server/trpc'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'
import { getServerPlanTier } from '../utils/getServerPlanTier'

const ServerListInputSchema = z.undefined()
const ServerListOutputSchema = z.union([z.null(), ServerPreviewsSchema])

export const getServerList = procedure
  .input(ServerListInputSchema)
  .output(ServerListOutputSchema)
  .query(async ({ ctx }) => {
    let { supabase } = ctx

    if (!supabase) {
      console.log(process.env.SUPABASE_SERVICE_ROLE_KEY!)
      supabase = createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false,
          },
        }
      )
    }

    let { data: fetchData, error } = await supabase.from('servers')
      .select(`
        joinId:id,
        page:servers_page(
          id,
          description,
          likes,
          followers,
          reviews
        ),
        createdAt:created_at
      `)

    if (error || !fetchData) return null

    const servers: ServerPreviewsSchemaType = []

    for (const server of fetchData) {
      const { joinId, page, createdAt } = server
      const planTier = await getServerPlanTier(supabase, page?.id || null)

      servers.push({
        joinId,
        description: page?.description || null,
        statistic: {
          likes: page?.likes || 0,
          followers: page?.followers || 0,
          reviews: page?.reviews || 0,
        },
        planTier,
        createdAt: createdAt ? new Date(createdAt).toISOString() : new Date().toISOString(),
      })
    }

    return servers
  })
