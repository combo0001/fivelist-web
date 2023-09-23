import { UserProfileSchema } from '@/schemas/users/ProfileSchema'
import { Database } from '@/@types/supabase'
import { procedure } from '@/server/trpc'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'
import { getUserPlanTier } from '../utils/getUserPlanTier'
import { getUserLevel } from '../utils/getUserLevel'
import { getActivities } from '../utils/getActivities'

const UserProfileInputSchema = z.object({
  customId: z.string().max(32),
})

const UserProfileOutputSchema = z.union([z.null(), UserProfileSchema])

export const getUserProfile = procedure
  .input(UserProfileInputSchema)
  .output(UserProfileOutputSchema)
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
      .select(
        `
        id,
        customId:custom_id,
        description,
        likes,
        views,
        followers,
        avatarURL:avatar_url,
        bannerURL:banner_url, 
        streamURL:stream_url, 
        createdAt:created_at, 
        updatedAt:updated_at, 
        socialMedia:user_social_media (
          socialMedia:social_media, 
          profileId:profile_id
        ),
        connections:user_connections (
          connection, 
          identifier
        ),
        activities:user_activities (
          message,
          points,
          createdAt:created_at
        )
      `,
      )
      .eq('custom_id', input.customId)
      .order('created_at', {
        foreignTable: 'user_social_media',
        ascending: true,
      })
      .order('created_at', {
        foreignTable: 'user_connections',
        ascending: true,
      })
      .order('created_at', {
        foreignTable: 'user_activities',
        ascending: true,
      })

    if (!fetchData || !fetchData[0]) return null

    const {
      id,
      customId,
      description,
      likes = 0,
      views = 0,
      followers = 0,
      avatarURL,
      bannerURL,
      streamURL,
      socialMedia,
      connections,
      activities: activitiesWithoutFormat,
      createdAt,
      updatedAt,
    } = fetchData[0]

    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.admin.getUserById(id)

    if (authError || !authUser) return null

    const { user_metadata: userMetadata } = authUser

    const activities = getActivities(activitiesWithoutFormat)
    const planTier = await getUserPlanTier(supabase, id)
    const level = await getUserLevel(activities)

    return {
      id,
      customId,
      planTier,
      page: {
        avatarURL,
        bannerURL,
        name: userMetadata.full_name,
        description,
        statistics: {
          followers: followers as number,
          likes: likes as number,
          views: views as number,
        },
        level,
        socialMedia,
        connections,
        activities,
        streamURL,
        isOnline: true,
      },
      createdAt: new Date(createdAt).toISOString(),
      updatedAt: new Date(updatedAt).toISOString(),
    }
  })
