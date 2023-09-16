import { z } from 'zod'
import { JoinIdSchema, ServerIdSchema } from './IdentitySchema'

export const ServerDescriptionSchema = z.string().max(4096)

export const ServerPreviewSchema = z.object({
  id: ServerIdSchema,
  joinId: JoinIdSchema,
  description: ServerDescriptionSchema,
  views: z.number().int(),
  likes: z.number().int(),
  followers: z.number().int(),
  reviews: z.number().int(),
  createdAt: z.string().datetime(),
})

export type ServerPreviewSchemaType = z.infer<typeof ServerPreviewSchema>

export const ServerPreviewsSchema = z.array(ServerPreviewSchema)

export type ServerPreviewsSchemaType = z.infer<typeof ServerPreviewsSchema>
