import { z } from 'zod'
import { ConnectionsSchema } from '../ConnectionSchema'

export const UserConnectionSchema = z.object({
  connection: ConnectionsSchema,
  identifier: z.string(),
})

export type UserConnectionSchemaType = z.infer<typeof UserConnectionSchema>

export const UserConnectionsListSchema = z.array(UserConnectionSchema)

export type UserConnectionsListSchemaType = z.infer<
  typeof UserConnectionsListSchema
>
