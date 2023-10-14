import { createContext } from '@/server/context'
import { procedure } from '@/server/trpc'
import { inferAsyncReturnType } from '@trpc/server'
import { z } from 'zod'
import { revalidateServer } from '../utils/revalidateServer'
import { ServerJoinIdSchema } from '@/schemas/servers/IdentitySchema'
import { ServerReviewContentSchema } from '@/schemas/servers/ReviewsSchema'
import { isUserValid } from '../../users/utils/isUserValid'

const ServerReviewInputSchema = z.object({
  joinId: ServerJoinIdSchema,
  pageId: z.string().uuid(),
  content: ServerReviewContentSchema,
  rating: z.number().int().min(0).max(5),
})

const ServerReviewOutputSchema = z.void()

export const createServerReview = procedure
  .input(ServerReviewInputSchema)
  .output(ServerReviewOutputSchema)
  .mutation(async ({ input, ctx }) => {
    const { supabase, session } = ctx

    if (!supabase || !session || !isUserValid(session)) return

    const { error: insertError } = await supabase.from('page_reviews').insert({
      page_id: input.pageId,
      author_id: session.user.id,
      content: input.content,
      rating: input.rating,
    })

    if (insertError) return

    await revalidateServer(
      ctx as inferAsyncReturnType<typeof createContext>,
      input.joinId,
    )
  })
