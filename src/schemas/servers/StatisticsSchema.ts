import { z } from 'zod'

export const ServerStatisticSchema = z.object({
  views: z.number().int(),
  likes: z.number().int(),
  followers: z.number().int(),
  reviews: z.number().int(),
})

export type ServerStatisticSchemaType = z.infer<typeof ServerStatisticSchema>
