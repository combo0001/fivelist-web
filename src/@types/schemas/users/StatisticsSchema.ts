import { z } from 'zod'

export const UserStatisticSchema = z.object({
  views: z.number(),
  likes: z.number(),
  followers: z.number(),
})

export type UserStatisticSchemaType = z.infer<typeof UserStatisticSchema>
