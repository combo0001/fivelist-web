import { OfferEnumSchemaType, PlanSchemaType, PrivilegeSchemaType } from '@/schemas/PremiumSchema'
import { ServerProfileSchemaType } from '@/schemas/servers/ProfileSchema'
import React, {
  Context,
  createContext,
  useContext,
  useState,
} from 'react'
import { useRouter } from 'next/navigation'

interface ProviderProps {
  offer: OfferEnumSchemaType
  changeOffer: (offer: OfferEnumSchemaType) => Promise<void>
  goToCheckout: (plan: PlanSchemaType) => Promise<void>
}

const PremiumCtx = createContext<ProviderProps | null>(null)

export const PremiumProvider: React.FC<{
  children: React.ReactNode
  server: ServerProfileSchemaType
}> = ({ children, server }) => {
  const router = useRouter()
  const [ offer, setOffer ] = useState<OfferEnumSchemaType>('MONTHLY')

  const changeOffer = async (offer: OfferEnumSchemaType) => {
    setOffer(offer)
  }

  const goToCheckout = async (plan: PlanSchemaType) => {
    router.push(`/servers/${server.joinId}/premium/new?plan=${plan.id}&offer=${offer}`)
  }

  return (
    <PremiumCtx.Provider value={{ offer, changeOffer, goToCheckout }}>
      {children}
    </PremiumCtx.Provider>
  )
}

export const usePremium = () =>
  useContext<ProviderProps>(PremiumCtx as Context<ProviderProps>)
