import { Database } from '@/@types/supabase'
import { OrderSchemaType, PaymentDataSchemaType } from '@/schemas/payment/OrderSchema'
import { SupabaseClient } from '@supabase/supabase-js'
import { getPlanObject } from './getPlanObject'
import fetch from 'node-fetch'
import { PayerPaymentMethodEnumType } from '@/schemas/payment/PayerPaymentMethodSchema'
import { TransactionRequestType, TransactionResponseType } from '../types'
import { PlanSchemaType } from '@/schemas/PremiumSchema'
import { getOfferMultiplier } from './getOfferMultiplier'

const getGatewayByPaymentType = async (paymentMethod: PayerPaymentMethodEnumType): Promise<string | void> => {
  const response = await 
    fetch('http://localhost:5001/api/transaction/list_methods', { 
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ADMIN_TOKEN'
      }, 
    })

  if (response.status !== 200) return
  
  const result = await response.json() as { [key: string]: Array<{ [key: string]: any }> }

  let gatewayName: string | undefined = undefined
  let paymentTypeId: string | undefined = undefined

  switch (paymentMethod) {  
    case 'TICKET':
      paymentTypeId = 'ticket'

      break
    case 'PIX':
      paymentTypeId = 'bank_transfer'
  }

  if (!paymentTypeId) return

  for (const name in result) {
    const gateway = result[name]
    const hasOption = gateway.some((method) => method.payment_type_id === paymentTypeId)

    if (hasOption) {
      gatewayName = name

      break
    }
  }

  return gatewayName
}

const createTransaction = async (
  plan: PlanSchemaType, 
  order: OrderSchemaType, 
  paymentData: PaymentDataSchemaType
): Promise<TransactionResponseType | void> => {
  const offerMultiplier = getOfferMultiplier(order.orderData.offer)
  
  const paymentGateway = await getGatewayByPaymentType(paymentData.paymentMethod)
  const paymentType = paymentData.paymentMethod === 'PIX' ? 'pix' : 'boleto'
  const paymentAmount = (plan.price[order.orderData.offer] as number) * offerMultiplier

  const bodyPayload = {
    description: plan.id,
    payment_type: paymentType,
    payment_gateway: paymentGateway,
    amount: Number(paymentAmount.toFixed(2)),
    payer: {
      identification_type: 'CPF',
      identification_number: paymentData.payer.identification.toString(),
      firstName: paymentData.payer.firstName,
      lastName: paymentData.payer.lastName,
      email: paymentData.payer.email,
      address: {
        address_number: paymentData.payer.address.houseNumber,
        address_street: paymentData.payer.address.street,
        address_zip: paymentData.payer.address.zipCode,
        address_neighborhood: paymentData.payer.address.neighborhood,
        address_city: paymentData.payer.address.city,
        address_state: paymentData.payer.address.state,
      }
    }
  } as TransactionRequestType
  
  if (!paymentGateway) return
  
  const response = await 
    fetch('http://localhost:5001/api/transaction/create', { 
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ADMIN_TOKEN'
      }, 
      body: JSON.stringify(bodyPayload) 
    })

  if (response.status !== 201) return
  
  return await response.json() as TransactionResponseType
}

export const payWithoutAutoCharge = async (
  supabase: SupabaseClient<Database>,
  order: OrderSchemaType,
  paymentData: PaymentDataSchemaType,
): Promise<{ success: boolean, redirectURL?: string }> => {
  const isServer = !!order.orderData.pageId
  const plan = await getPlanObject(isServer, order.orderData.planId)
  
  if (!plan) return { success: false }
  
  const transaction = await createTransaction(plan, order, paymentData)
  
  if (!transaction) return { success: false }
  
  const { error } = await supabase
    .from('orders')
    .update({
      transaction_id: transaction.gwTransactionId.toString(),
      payment_data: paymentData,
    })
    .eq('id', order.id)
    .eq('owner_id', order.ownerUser.id)

  if (error) return { success: false }
  
  return { success: true, redirectURL: transaction.gwTransactionUrl }
}