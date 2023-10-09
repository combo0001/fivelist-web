import { z } from 'zod'
import { ServerJoinIdSchema } from './IdentitySchema'
import { ServerPagePreviewSchema } from './PagePreviewSchema'

export const ServerPreviewSchema = z.object({
  joinId: ServerJoinIdSchema,
  page: ServerPagePreviewSchema.nullable(),
  createdAt: z.string().datetime(),
})

export type ServerPreviewSchemaType = z.infer<typeof ServerPreviewSchema>

export const ServerPreviewsSchema = z.array(ServerPreviewSchema)

export type ServerPreviewsSchemaType = z.infer<typeof ServerPreviewsSchema>
