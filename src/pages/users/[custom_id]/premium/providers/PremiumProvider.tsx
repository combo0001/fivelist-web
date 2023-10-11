import { OfferEnumSchemaType, PlanSchemaType } from '@/schemas/PremiumSchema'
import { UserProfileSchemaType } from '@/schemas/users/ProfileSchema'
import { useRouter } from 'next/navigation'
import React, {
  Context,
  createContext,
  useContext,
  useState,
} from 'react'

interface ProviderProps {
  offer: OfferEnumSchemaType
  goToCheckout: (plan: PlanSchemaType) => Promise<void>
  changeOffer: (offer: OfferEnumSchemaType) => Promise<void>
}

const PremiumCtx = createContext<ProviderProps | null>(null)

export const PremiumProvider: React.FC<{
  children: React.ReactNode
  user: UserProfileSchemaType
}> = ({ children, user }) => {
  const router = useRouter()
  const [ offer, setOffer ] = useState<OfferEnumSchemaType>('MONTHLY')

  const changeOffer = async (offer: OfferEnumSchemaType) => {
    setOffer(offer)
  }

  const goToCheckout = async (plan: PlanSchemaType): Promise<void> => {
    router.push(`/users/${user.customId}/premium/new?plan=${plan.id}&offer=${offer}`)
  }

  return (
    <PremiumCtx.Provider value={{ offer, goToCheckout, changeOffer }}>
      {children}
    </PremiumCtx.Provider>
  )
}

export const usePremium = () =>
  useContext<ProviderProps>(PremiumCtx as Context<ProviderProps>)
