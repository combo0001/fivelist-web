import { Database } from '@/@types/supabase'
import { procedure } from '@/server/trpc'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'
import { ServerReviewsSchema, ServerReviewsSchemaType } from '@/schemas/servers/ReviewsSchema'
import { getUserPlanTier } from '../../users/utils/getUserPlanTier'

const ServerReviewsInputSchema = z.object({
  pageId: z.string().uuid(),
  offset: z.object({
    from: z.string().datetime(),
    amount: z.number().int()
  })
})

const ServerReviewsOutputSchema = z.union([z.null(), ServerReviewsSchema])

export const getServerReviews = procedure
  .input(ServerReviewsInputSchema)
  .output(ServerReviewsOutputSchema)
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

    const { error: reviewsError, data: reviewsData } = await supabase
      .from('page_reviews')
      .select(`
        id,
        user:users(
          id, 
          customId:custom_id, 
          createdAt:created_at,
          updatedAt:updated_at
        ),
        content,
        rating,
        createdAt:created_at
      `)
      .eq('page_id', input.pageId)
      .lt('created_at', input.offset.from)
      .order('created_at', { ascending: false })
      .limit(input.offset.amount)

    if (reviewsError) return null
    
    const reviewsResult: ServerReviewsSchemaType = []
    
    for (const review of reviewsData) {
      const { user } = review

      if (!user) continue

      const planTier = await getUserPlanTier(supabase, user.id)
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.admin.getUserById(user.id)

      if (authError || !authUser) continue

      const { user_metadata: userMetadata } = authUser

      const { error: repliesError, data: repliesData } = await supabase
        .from('page_review_replies')
        .select(`
          content,
          createdAt:created_at
        `)
        .eq('review_id', review.id)

      if (repliesError) continue

      const replies = repliesData.map(reply => ({
        content: reply.content,
        createdAt: new Date(reply.createdAt).toISOString(),
      }))

      reviewsResult.push({  
        id: review.id,
        content: review.content,
        rating: review.rating,
        createdAt: new Date(review.createdAt).toISOString(),
        user: {
          id: user.id,
          customId: user.customId,
          planTier,
          name: userMetadata.full_name,
          createdAt: new Date(user.createdAt).toISOString(),
          updatedAt: new Date(user.updatedAt).toISOString(),
        },
        replies,
      })
    }

    return reviewsResult
  })
