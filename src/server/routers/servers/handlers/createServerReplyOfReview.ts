import { createContext } from '@/server/context'
import { procedure } from '@/server/trpc'
import { inferAsyncReturnType } from '@trpc/server'
import { z } from 'zod'
import { revalidateServer } from '../utils/revalidateServer'
import { ServerJoinIdSchema } from '@/schemas/servers/IdentitySchema'
import { ServerReviewContentSchema } from '@/schemas/servers/ReviewsSchema'
import { isUserValid } from '../../users/utils/isUserValid'

const ServerReplyOfReviewInputSchema = z.object({
  joinId: ServerJoinIdSchema,
  reviewId: z.string().uuid(),
  content: ServerReviewContentSchema,
})

const ServerReplyOfReviewOutputSchema = z.void()

export const createServerReplyOfReview = procedure
  .input(ServerReplyOfReviewInputSchema)
  .output(ServerReplyOfReviewOutputSchema)
  .mutation(async ({ input, ctx }) => {
    const { supabase, session } = ctx

    if (!supabase || !session || !isUserValid(session)) return

    const { data: reviewData, error: fetchError } = await supabase
      .from('page_reviews')
      .select(
        `
        id, 
        pages(id)
      `,
      )
      .eq('id', input.reviewId)
      .eq('pages.owner_id', session.user.id)
      .single()

    if (fetchError || !reviewData) return

    const { error: insertError } = await supabase
      .from('page_review_replies')
      .insert({
        review_id: reviewData.id,
        content: input.content,
      })

    if (insertError) return

    await revalidateServer(
      ctx as inferAsyncReturnType<typeof createContext>,
      input.joinId,
    )
  })
