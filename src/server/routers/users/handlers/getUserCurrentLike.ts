import { UserLikeSchema } from '@/schemas/users/LikeSchema'
import { procedure } from '@/server/trpc'
import { z } from 'zod'
import { getUserPlanTier } from '../utils/getUserPlanTier'
import { getServerPlanTier } from '../../servers/utils/getServerPlanTier'
import { isUserValid } from '../utils/isUserValid'

const UserLikeInputSchema = z.undefined()
const UserLikeOutputSchema = z.union([z.null(), UserLikeSchema])

export const getUserCurrentLike = procedure
  .input(UserLikeInputSchema)
  .output(UserLikeOutputSchema)
  .query(async ({ ctx }) => {
    const { supabase, session } = ctx

    if (!supabase || !session || !isUserValid(session)) return null

    const userPlanTier = await getUserPlanTier(supabase, session.user.id)

    const hasDouble = userPlanTier.privileges.DOUBLE_LIKE
    const limitDateString = new Date(Date.now() - (hasDouble ? 12 : 24) * 60 * 60 * 1000).toISOString()

    const { data: likeData, error: likeError } = await supabase
      .from('page_likes')
      .select(`
        page:pages(
          id,
          description,
          likes,
          followers,
          reviews
        ),
        createdAt:created_at
      `)
      .eq('author_id', session.user.id)
      .gte('created_at', limitDateString)
      .order('created_at', { ascending: false })
      .single()

    if (likeError || !likeData || !likeData.page) return null

    const serverPlanTier = await getServerPlanTier(supabase, likeData.page.id)

    return {
      page: {
        id: likeData.page.id,
        description: likeData.page.description,
        statistic: {
          likes: likeData.page.likes,
          followers: likeData.page.followers,
          reviews: likeData.page.reviews,
        },
        planTier: serverPlanTier,
      },
      createdAt: new Date(likeData.createdAt).toISOString(),
    }
  })
