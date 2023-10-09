import { procedure } from '@/server/trpc'
import { z } from 'zod'
import { getUserPlanTier } from '../utils/getUserPlanTier'

const UserLikeInputSchema = z.object({
  pageId: z.string().uuid(),
})

const UserLikeOutputSchema = z.void()

export const setUserLike = procedure
  .input(UserLikeInputSchema)
  .output(UserLikeOutputSchema)
  .mutation(async ({ input, ctx }) => {
    const { supabase, session } = ctx

    if (!supabase || !session) return

    const userPlanTier = await getUserPlanTier(supabase, session.user.id)

    const hasDouble = userPlanTier.privileges.DOUBLE_LIKE
    const limitDateString = new Date(Date.now() - (hasDouble ? 12 : 24) * 60 * 60 * 1000).toISOString()

    const { data: likeData, error: likeError } = await supabase
      .from('user_likes')
      .select('id')
      .eq('author_id', session.user.id)
      .gte('created_at', limitDateString)
      .order('created_at', { ascending: false })

    if (likeError || likeData.length) return

    const { error: insertError } = await supabase
      .from('user_likes')
      .insert({
        author_id: session.user.id,
        page_id: input.pageId,
      })

    if (insertError) return 
  })
