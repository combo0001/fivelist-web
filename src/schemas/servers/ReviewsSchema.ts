import { z } from 'zod'
import { UserPreviewSchema } from '../users/PreviewSchema'

export const ServerReviewRatingSchema = z.number().int().min(0).max(5)
export const ServerReviewContentSchema = z.string()

export const ServerReviewReplySchema = z.object({
  content: ServerReviewContentSchema,
  createdAt: z.string().datetime(),
})

export type ServerReviewReplySchemaType = z.infer<
  typeof ServerReviewReplySchema
>

export const ServerReviewSchema = z.object({
  id: z.string().uuid(),
  user: UserPreviewSchema,
  content: ServerReviewContentSchema,
  rating: ServerReviewRatingSchema,
  replies: z.array(ServerReviewReplySchema),
  createdAt: z.string().datetime(),
})

export type ServerReviewSchemaType = z.infer<typeof ServerReviewSchema>

export const ServerReviewsSchema = z.array(ServerReviewSchema)

export type ServerReviewsSchemaType = z.infer<typeof ServerReviewsSchema>
