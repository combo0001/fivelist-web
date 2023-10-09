import { z } from 'zod'
import { ServerPagePreviewSchema } from '../servers/PagePreviewSchema'

export const UserLikeSchema = z.object({ 
  page: ServerPagePreviewSchema,
  createdAt: z.string().datetime(),
})

export type UserLikeSchemaType = z.infer<typeof UserLikeSchema> 
