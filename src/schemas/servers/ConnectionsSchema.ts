import { z } from 'zod'

export const ServerConnectionSchema = z.object({
  name: z.string().max(24),
  redirectURL: z.string(),
})

export type ServerConnectionSchemaType = z.infer<typeof ServerConnectionSchema>

export const ServerConnectionsListSchema = z.array(ServerConnectionSchema)

export type ServerConnectionsListSchemaType = z.infer<
  typeof ServerConnectionsListSchema
>
