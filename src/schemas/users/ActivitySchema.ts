import { z } from 'zod'

export const UserActivitySchema = z.object({
  message: z.string().max(256),
  points: z.number().int(),
  createdAt: z.string().datetime(),
})

export type UserActivitySchemaType = z.infer<typeof UserActivitySchema>

export const UserActivitiesListSchema = z.array(UserActivitySchema)

export type UserActivitiesListSchemaType = z.infer<
  typeof UserActivitiesListSchema
>
