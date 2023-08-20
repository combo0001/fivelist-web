import { z } from 'zod'

import { nameSchema } from './SignUpSchema'

export const UserPageSchema = z.object({
  id: z.string().uuid(),
  customId: z.string().max(32),
  name: nameSchema,
  description: z.string().max(4096).nullable(),
  views: z.number(),
  likes: z.number(),
  followers: z.number(),
  streamURL: z.string().max(256).nullable(),
  createdAt: z.string().datetime(),
})

export type UserPageSchemaType = z.infer<typeof UserPageSchema>

export const UserPageSchemaRequest = z.object({
  customId: z.string().max(32),
})

export type UserPageSchemaRequestType = z.infer<typeof UserPageSchemaRequest>

export const UserPageSchemaResponse = z.union([z.null(), UserPageSchema])

export type UserPageSchemaResponseType = z.infer<typeof UserPageSchemaResponse>
