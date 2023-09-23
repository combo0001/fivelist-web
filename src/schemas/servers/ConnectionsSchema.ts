import { z } from 'zod'

export const ServerConnectionSchema = z.object({
  label: z.string().max(24),
  url: z.string(),
})

export type ServerConnectionSchemaType = z.infer<typeof ServerConnectionSchema>

export const ServerConnectionsListSchema = z.array(ServerConnectionSchema)

export type ServerConnectionsListSchemaType = z.infer<
  typeof ServerConnectionsListSchema
>
