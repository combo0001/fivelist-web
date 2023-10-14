import { useRouter as useNavigation } from 'next/navigation'
import React, {
  Context,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  OrderIdSchemaType,
  OrderSchemaType,
} from '@/schemas/payment/OrderSchema'
import { UserIdentitySchemaType } from '@/schemas/users/IdentitySchema'
import { trpc } from '@/utils/trpc'
import { OfferEnumSchemaType, PlanSchemaType } from '@/schemas/PremiumSchema'
import { PayerPaymentMethodEnumType } from '@/schemas/payment/PayerPaymentMethodSchema'
import { PayerSchemaType } from '@/schemas/payment/PayerSchema'

interface ProviderProps {
  order: OrderSchemaType
  plan: PlanSchemaType | null
  changeOffer: (offer: OfferEnumSchemaType) => Promise<void>
  finishOrder: (
    paymentMethod: PayerPaymentMethodEnumType,
    payer: PayerSchemaType,
  ) => Promise<string | void>
}

const getPlanObject = async (
  isServer: boolean,
  planId: string,
): Promise<PlanSchemaType | null> => {
  const plansResponse = await fetch(
    isServer ? '/config/server-plans.json' : '/config/user-plans.json',
  )
  const plansResult = await plansResponse.json()

  return (
    plansResult.find(
      (planObject: PlanSchemaType) => planObject.id === planId,
    ) || null
  )
}

const CheckoutCtx = createContext<ProviderProps | null>(null)

export const CheckoutProvider: React.FC<{
  children: React.ReactNode
  user: UserIdentitySchemaType | null
  order: OrderIdSchemaType | undefined
}> = ({ children, order: orderId }) => {
  const router = useNavigation()

  const payOrder = trpc.payment.payOrder.useMutation()
  const updateOrderData = trpc.payment.updateOrderData.useMutation()

  const {
    data: order,
    isFetching,
    refetch,
  } = trpc.payment.getOrder.useQuery({ id: orderId })
  const [plan, setPlan] = useState<PlanSchemaType | null>(null)

  const changeOffer = useCallback(
    async (offer: OfferEnumSchemaType): Promise<void> => {
      if (!order || order.orderData.offer === offer) return

      const wasSuccess = await updateOrderData.mutateAsync({
        orderId: order.id,
        orderData: {
          ...order.orderData,
          offer,
        },
      })

      if (wasSuccess) {
        await refetch()
      }
    },
    [order, refetch, updateOrderData],
  )

  const finishOrder = useCallback(
    async (
      paymentMethod: PayerPaymentMethodEnumType,
      payer: PayerSchemaType,
    ): Promise<string | void> => {
      if (!order || order.transactionId) return

      const { success, redirectURL } = await payOrder.mutateAsync({
        orderId: order.id,
        paymentData: {
          paymentMethod,
          payer,
        },
      })

      if (!success) return

      return redirectURL
    },
    [order, payOrder],
  )

  useEffect(() => {
    if (isFetching) return

    if (!order || order.transactionId) {
      router.push('/home')

      return
    }

    if (plan && plan.id === order.orderData.planId) return

    getPlanObject(!!order.orderData.pageId, order.orderData.planId).then(
      (plan) => {
        setPlan(plan)
      },
    )
  }, [isFetching, order, plan, router])

  if (!order || order.transactionId) {
    return <></>
  }

  return (
    <CheckoutCtx.Provider value={{ order, plan, changeOffer, finishOrder }}>
      {children}
    </CheckoutCtx.Provider>
  )
}

export const useCheckout = () =>
  useContext<ProviderProps>(CheckoutCtx as Context<ProviderProps>)
