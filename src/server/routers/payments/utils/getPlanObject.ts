import { PlanSchemaType } from '@/schemas/PremiumSchema'

import serverPlans from '../../../../../public/config/server-plans.json'
import userPlans from '../../../../../public/config/user-plans.json'

export const getPlanObject = async (isServer: boolean, planId: string): Promise<PlanSchemaType | null> => {
  const plansResult: any = isServer ? serverPlans : userPlans

  return plansResult.find((planObject: PlanSchemaType) => planObject.id === planId) || null
}