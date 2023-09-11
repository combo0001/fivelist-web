import { z } from 'zod'

export const UserStatisticSchema = z.object({
  views: z.number().int(),
  likes: z.number().int(),
  followers: z.number().int(),
})

export type UserStatisticSchemaType = z.infer<typeof UserStatisticSchema>
