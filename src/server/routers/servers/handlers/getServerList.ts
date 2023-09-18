import { Database } from '@/@types/supabase'
import { ServerPreviewsSchema } from '@/schemas/servers/PreviewSchema'
import { procedure } from '@/server/trpc'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

const ServerListInputSchema = z.undefined()
const ServerListOutputSchema = z.union([z.null(), ServerPreviewsSchema])

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
    
    return fetchData.map(({ joinId, page, createdAt }) => {
      return {
        joinId,
        description: page?.description || null,
        statistic: {
          likes: page?.likes || 0,
          followers: page?.followers || 0,
          reviews: page?.reviews || 0,
        },
        planTier: {
          id: 0,
          name: 'Free',
          privileges: {},
        },
        createdAt: createdAt ? new Date(createdAt).toISOString() : new Date().toISOString(),
      }
    })
  })
