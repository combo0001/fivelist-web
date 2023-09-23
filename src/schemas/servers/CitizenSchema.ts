import { z } from 'zod'
import { ServerJoinIdSchema } from './IdentitySchema'

export const ServerCitizenSchema = z.object({
  joinId: ServerJoinIdSchema,
  projectName: z.string(),
  country: z.string().regex(/^[a-zA-Z]{2}$/),
  gameName: z.string(),
  playersCurrent: z.number().int(),
  playersMax: z.number().int(),
  isPrivate: z.boolean().default(false).optional(),
})

export type ServerCitizenSchemaType = z.infer<typeof ServerCitizenSchema>