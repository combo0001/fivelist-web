import { OfferEnumSchemaType, PlanSchemaType } from '@/schemas/PremiumSchema'
import React, {
  Context,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

interface ProviderProps {
  plan: PlanSchemaType | null | undefined,
  offer: OfferEnumSchemaType,
  changeOffer: (newOffer: OfferEnumSchemaType) => void,
}

const getPlanObject = async (plan: string): Promise<PlanSchemaType | null> => {
  const plansResponse = await fetch('/config/server-plans.json')
  const plansResult = await plansResponse.json()

  return plansResult.find((planObject: PlanSchemaType) => planObject.id === plan) || null
}

const PaymentCtx = createContext<ProviderProps | null>(null)

export const PaymentProvider: React.FC<{
  children: React.ReactNode,
  plan: string,
  offer: OfferEnumSchemaType,
}> = ({ children, plan: planId, offer: defaultOffer }) => {
  const [ plan, setPlan ] = useState<PlanSchemaType | null | undefined>(undefined)
  const [ offer, setOffer ] = useState<OfferEnumSchemaType>(defaultOffer)

  const changeOffer = useCallback(
    (newOffer: OfferEnumSchemaType) => {
      setOffer(newOffer)
    }, 
    [ offer ]
  )

  useEffect(() => {
    if (plan) return 

    getPlanObject(planId)
      .then((plan) => {
        setPlan(plan)
      })
  }, [ plan ])

  return (
    <PaymentCtx.Provider value={{ plan, offer, changeOffer }}>
      {children}
    </PaymentCtx.Provider>
  )
}

export const usePayment = () =>
  useContext<ProviderProps>(PaymentCtx as Context<ProviderProps>)
