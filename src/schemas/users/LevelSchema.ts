import { z } from 'zod'

export const LevelSchema = z.object({
  id: z.number().int(),
  points: z.number().int(),
  extension: z.number().int(),
})

export const UserLevelSchema = z.object({
  points: z.number().int(),
  currentLevel: LevelSchema,
  nextLevel: LevelSchema,
})

export type UserLevelSchemaType = z.infer<typeof UserLevelSchema>
