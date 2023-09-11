import { UserLevelSchemaType } from '@/schemas/users/LevelSchema'
import { UserActivitiesListSchemaType } from '@/schemas/users/ActivitySchema'

export const getUserLevel = async (
  activities: UserActivitiesListSchemaType,
): Promise<UserLevelSchemaType> => {
  const EXTENSION = 20

  const points = activities.reduce((acc, { points }) => acc + points, 0)
  const level = Math.floor(points / EXTENSION)

  const currentLevel = {
    id: level,
    extension: EXTENSION,
    points: level * EXTENSION,
  }

  const nextLevel = {
    id: level + 1,
    extension: EXTENSION,  
    points: (level + 1) * EXTENSION,
  }

  return {
    currentLevel: currentLevel,
    nextLevel: nextLevel,
    points,
  }
}
