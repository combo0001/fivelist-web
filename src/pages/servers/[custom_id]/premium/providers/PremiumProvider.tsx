import { OfferEnumSchemaType, PlanSchemaType } from '@/schemas/PremiumSchema'
import { ServerProfileSchemaType } from '@/schemas/servers/ProfileSchema'
import React, { Context, createContext, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { trpc } from '@/utils/trpc'

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
  const createOrder = trpc.payment.createOrder.useMutation()

  const [offer, setOffer] = useState<OfferEnumSchemaType>('MONTHLY')

  const changeOffer = async (offer: OfferEnumSchemaType) => {
    setOffer(offer)
  }

  const goToCheckout = async (plan: PlanSchemaType) => {
    const orderId = await createOrder.mutateAsync({
      orderData: {
        pageId: server.page.id,
        planId: plan.id,
        offer,
      },
    })

    if (orderId) {
      router.push(`/checkout?order=${orderId}`)
    }
  }

  return (
    <PremiumCtx.Provider value={{ offer, changeOffer, goToCheckout }}>
      {children}
    </PremiumCtx.Provider>
  )
}

export const usePremium = () =>
  useContext<ProviderProps>(PremiumCtx as Context<ProviderProps>)
