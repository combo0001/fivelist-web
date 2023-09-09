import { z } from 'zod'

export const ConnectionSchema = z.enum(['DISCORD', 'STEAM'])

export type ConnectionsSchemaType = z.infer<typeof ConnectionSchema>
