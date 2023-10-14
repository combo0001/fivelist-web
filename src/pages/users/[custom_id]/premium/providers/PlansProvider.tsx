import { PlanSchemaType, PrivilegeSchemaType } from '@/schemas/PremiumSchema'
import React, {
  Context,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

interface ProviderProps {
  plans: PlanSchemaType[] | null
  privileges: PrivilegeSchemaType[] | null
}

const getPlansObject = async (): Promise<PlanSchemaType[]> => {
  const plansResponse = await fetch('/config/user-plans.json')
  const plansResult = await plansResponse.json()

  return plansResult
}

const getPrivilegesList = async (): Promise<PrivilegeSchemaType[]> => {
  const privilegesResponse = await fetch('/config/user-privileges.json')
  const privilegesResult = await privilegesResponse.json()

  return privilegesResult
}

const PlansCtx = createContext<ProviderProps | null>(null)

export const PlansProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [plans, setPlans] = useState<PlanSchemaType[] | null>(null)
  const [privileges, setPrivileges] = useState<PrivilegeSchemaType[] | null>(
    null,
  )

  useEffect(() => {
    if (plans) return

    getPlansObject().then((plans) => {
      setPlans(plans)
    })
  }, [plans])

  useEffect(() => {
    if (plans) return

    getPrivilegesList().then((privileges) => {
      setPrivileges(privileges)
    })
  }, [plans])

  return (
    <PlansCtx.Provider value={{ plans, privileges }}>
      {children}
    </PlansCtx.Provider>
  )
}

export const usePlans = () =>
  useContext<ProviderProps>(PlansCtx as Context<ProviderProps>)
