import { z } from 'zod'

export const UserConnectionSchema = z.object({
  name: z.string(),
  url: z.string(),
})

export type UserConnectionSchemaType = z.infer<typeof UserConnectionSchema>

export const UserConnectionListSchema = z.array(UserConnectionSchema)

export type UserConnectionListSchemaType = z.infer<
  typeof UserConnectionListSchema
>
