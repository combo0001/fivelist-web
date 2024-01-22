import { z } from 'zod'

export const ConnectionsSchema = z.enum(['DISCORD', 'STEAM'])

export type ConnectionsSchemaType = z.infer<typeof ConnectionsSchema>
