import { Database } from '@/@types/supabase'
import {
  UserPageSchemaRequest,
  UserPageSchemaResponse,
} from '@/lib/schemas/UserPageSchema'
import { procedure } from '@/server/trpc'
import { createClient } from '@supabase/supabase-js'

export const getUserPage = procedure
  .input(UserPageSchemaRequest)
  .output(UserPageSchemaResponse)
  .query(async ({ input, ctx }) => {
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
      .from('users')
      .select('*')
      .eq('custom_id', input.customId)

    if (!fetchData || !fetchData[0]) return null

    const {
      id,
      custom_id: customId,
      description,
      likes = 0,
      views = 0,
      followers = 0,
      stream_url: streamURL,
      created_at: createdAt,
    } = fetchData[0]

    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.admin.getUserById(id)

    if (authError || !authUser) return null

    const { user_metadata: userMetadata } = authUser

    const createdAtDate = createdAt ? new Date(createdAt) : new Date()

    return {
      id,
      customId,
      name: userMetadata.full_name,
      description,
      likes: likes as number,
      views: views as number,
      followers: followers as number,
      streamURL,
      createdAt: createdAtDate.toISOString(),
    }
  })
