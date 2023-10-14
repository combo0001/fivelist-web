import { OfferEnumSchemaType, PlanSchemaType } from '@/schemas/PremiumSchema'
import { UserProfileSchemaType } from '@/schemas/users/ProfileSchema'
import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/navigation'
import React, { Context, createContext, useContext, useState } from 'react'

interface ProviderProps {
  offer: OfferEnumSchemaType
  goToCheckout: (plan: PlanSchemaType) => Promise<void>
  changeOffer: (offer: OfferEnumSchemaType) => Promise<void>
}

const PremiumCtx = createContext<ProviderProps | null>(null)

export const PremiumProvider: React.FC<{
  children: React.ReactNode
  user: UserProfileSchemaType
}> = ({ children }) => {
  const router = useRouter()
  const createOrder = trpc.payment.createOrder.useMutation()

  const [offer, setOffer] = useState<OfferEnumSchemaType>('MONTHLY')

  const changeOffer = async (offer: OfferEnumSchemaType) => {
    setOffer(offer)
  }

  const goToCheckout = async (plan: PlanSchemaType) => {
    const orderId = await createOrder.mutateAsync({
      orderData: {
        planId: plan.id,
        offer,
      },
    })

    if (orderId) {
      router.push(`/checkout?order=${orderId}`)
    }
  }

  return (
    <PremiumCtx.Provider value={{ offer, goToCheckout, changeOffer }}>
      {children}
    </PremiumCtx.Provider>
  )
}

export const usePremium = () =>
  useContext<ProviderProps>(PremiumCtx as Context<ProviderProps>)
