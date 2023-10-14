import { UserActivitiesListSchemaType } from '@/schemas/users/ActivitySchema'

interface ActivitiesProps {
  message: string
  points: number
  createdAt: string | null
}

export const getActivities = (
  activities: ActivitiesProps[],
): UserActivitiesListSchemaType => {
  if (!activities || !activities.length) return []
  return activities.map(({ message, points, createdAt }) => {
    return {
      message,
      points,
      createdAt: createdAt
        ? new Date(createdAt).toISOString()
        : new Date().toISOString(),
    }
  })
}
