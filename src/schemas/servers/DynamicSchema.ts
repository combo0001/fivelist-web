import { z } from 'zod'
import { ServerJoinIdSchema } from './IdentitySchema'

export const ServerDynamicVariables = z.record(z.string())

export type ServerDynamicVariablesType = z.infer<typeof ServerDynamicVariables>

export const ServerDynamicPlayer = z.object({
  identifiers: z.array(z.string()),
  name: z.string(),
  ping: z.number().int(),
})

export type ServerDynamicPlayerType = z.infer<typeof ServerDynamicPlayer>

export const ServerDynamicSchema = z.object({
  joinId: ServerJoinIdSchema,
  projectName: z.string(),
  hostName: z.string(),
  country: z.string().regex(/^[a-zA-Z]{2}$/),
  gameName: z.string(),
  playersCurrent: z.number().int(),
  playersMax: z.number().int(),
  variables: ServerDynamicVariables,
  players: z.array(ServerDynamicPlayer),
  resources: z.array(z.string()),
  isOnline: z.boolean(),
  isPrivate: z.boolean().default(false).optional(),
})

export type ServerDynamicSchemaType = z.infer<typeof ServerDynamicSchema>