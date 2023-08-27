import { z } from 'zod'

export const LevelSchema = z.object({
  id: z.number(),
  points: z.number(),
  extension: z.number(),
})

export const UserLevelSchema = z.object({
  points: z.number(),
  currentLevel: LevelSchema,
  nextLevel: LevelSchema,
})

export type UserLevelSchemaType = z.infer<typeof UserLevelSchema>
