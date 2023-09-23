import { z } from 'zod'
import { ServerPageSchema } from './PageSchema'
import { ServerJoinIdSchema } from './IdentitySchema'

export const ServerNameSchema = z.string()

export const ServerProfileSchema = z.object({
  joinId: ServerJoinIdSchema, 
  hostName: ServerNameSchema, 
  playersCurrent: z.number().int(),
  playersMax: z.number().int(),
  page: ServerPageSchema,
  createdAt: z.string().datetime(),
})

export type ServerProfileSchemaType = z.infer<typeof ServerProfileSchema>
