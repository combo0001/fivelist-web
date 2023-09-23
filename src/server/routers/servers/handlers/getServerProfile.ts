import { Database } from '@/@types/supabase'
import { procedure } from '@/server/trpc'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'
import { ServerProfileSchema, ServerProfileSchemaType } from '@/schemas/servers/ProfileSchema'
import { ServerJoinIdSchema } from '@/schemas/servers/IdentitySchema'
import { createServerPage } from '../utils/createServerPage'
import { getServerCompletePage } from '../utils/getServerCompletePage'
import { getServerDynamic } from '../utils/getServerDynamic'

const ServerListInputSchema = z.object({
  joinId: ServerJoinIdSchema,
})

const ServerListOutputSchema = z.union([z.null(), ServerProfileSchema])

export const getServerProfile = procedure
  .input(ServerListInputSchema)
  .output(ServerListOutputSchema)
  .query(async ({ ctx, input }) => {
    let { supabase } = ctx

    if (!supabase) {
      supabase = createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false,
          },
        },
      )
    }

    const { data: fetchData } = await supabase
      .from('servers')
      .select(`
        joinId:id,
        page:servers_page(
          bannerUrl:banner_url,
          createdAt:created_at,
          customId:custom_id,
          ownerId:owner_id,
          description,
          followers,
          id,
          likes,
          reviews,
          views
        ),
        createdAt:created_at
      `)
      .eq('id', input.joinId)

    let serverProfile = fetchData?.length ? fetchData[0] : null

    if (!serverProfile) {
      const { data: insertServerData, error: insertServerError } = await supabase
        .from('servers')
        .insert({
          id: input.joinId
        })
        .select(`
          joinId:id,
          page:servers_page(
            bannerUrl:banner_url,
            createdAt:created_at,
            customId:custom_id,
            ownerId:owner_id,
            description,
            followers,
            id,
            likes,
            reviews,
            views
          ),
          createdAt:created_at
        `)

      if (insertServerError || !insertServerData.length) return null

      const [ server ] = insertServerData

      serverProfile = {
        ...server, 
      }
    }

    if (!serverProfile.page) {
      const page = await createServerPage(supabase, serverProfile.joinId)
      
      if (!page) return null
      
      serverProfile.page = page
    }
    
    const {
       joinId,
       page: pageInDatabase,
       createdAt
    } = serverProfile

    const page = await getServerCompletePage(supabase, pageInDatabase)
    const serverDynamic = await getServerDynamic(joinId)
    
    if (!serverDynamic) return null
    
    return {
      joinId,
      ...serverDynamic,
      page,
      createdAt: new Date(createdAt).toISOString(),
    }
  })
