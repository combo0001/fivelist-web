import { Database } from '@/@types/supabase'
import {
  OrderSchemaType,
  PaymentDataSchemaType,
} from '@/schemas/payment/OrderSchema'
import { SupabaseClient } from '@supabase/supabase-js'
import { getPlanObject } from './getPlanObject'
import { PlanSchemaType } from '@/schemas/PremiumSchema'
import { SubscriptionRequestType, SubscriptionResponseType } from '../types'
import { PayerPaymentMethodEnumType } from '@/schemas/payment/PayerPaymentMethodSchema'
import { getOfferMultiplier } from './getOfferMultiplier'

const getGatewayByPaymentType = async (
  paymentMethod: PayerPaymentMethodEnumType,
): Promise<string | void> => {
  const response = await fetch(
    'http://localhost:5001/api/transaction/list_methods',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ADMIN_TOKEN',
      },
    },
  )

  if (response.status !== 200) return

  const result = (await response.json()) as {
    [key: string]: Array<{ [key: string]: any }>
  }

  let gatewayName: string | undefined
  let paymentTypeId: string | undefined

  switch (paymentMethod) {
    case 'CREDIT_CARD':
      paymentTypeId = 'credit_card'
  }

  if (!paymentTypeId) return

  for (const name in result) {
    const gateway = result[name]
    const hasOption = gateway.some(
      (method) => method.payment_type_id === paymentTypeId,
    )

    if (hasOption) {
      gatewayName = name

      break
    }
  }

  return gatewayName
}

const createSubscription = async (
  plan: PlanSchemaType,
  order: OrderSchemaType,
  paymentData: PaymentDataSchemaType,
): Promise<SubscriptionResponseType | void> => {
  const dateToday = new Date().getDate().toString()
  const offerMultiplier = getOfferMultiplier(order.orderData.offer)

  const paymentGateway = await getGatewayByPaymentType(
    paymentData.paymentMethod,
  )
  const paymentAmount =
    (plan.price[order.orderData.offer] as number) * offerMultiplier

  const bodyPayload = {
    reason: plan.id,
    billing_day: dateToday,
    payment_type: paymentGateway,
    amount: Number(paymentAmount.toFixed(2)),
  } as SubscriptionRequestType

  if (!paymentGateway) return

  const response = await fetch(
    'http://localhost:5001/api/transaction/subscription_plan',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ADMIN_TOKEN',
      },
      body: JSON.stringify(bodyPayload),
    },
  )

  if (response.status !== 201) return

  const result = (await response.json()) as SubscriptionResponseType

  return result
}

export const payWithAutoCharge = async (
  supabase: SupabaseClient<Database>,
  order: OrderSchemaType,
  paymentData: PaymentDataSchemaType,
): Promise<{ success: boolean; redirectURL?: string }> => {
  const isServer = !!order.orderData.pageId
  const plan = await getPlanObject(isServer, order.orderData.planId)

  if (!plan) return { success: false }

  const subscription = await createSubscription(plan, order, paymentData)

  if (!subscription) return { success: false }

  const { error } = await supabase
    .from('orders')
    .update({
      transaction_id: subscription.gwSubscriptionTransactionId.toString(),
      payment_data: paymentData,
    })
    .eq('id', order.id)
    .eq('owner_id', order.ownerUser.id)

  if (error) return { success: false }

  return {
    success: true,
    redirectURL: subscription.gwSubscriptionTransactionCheckoutUrl,
  }
}
