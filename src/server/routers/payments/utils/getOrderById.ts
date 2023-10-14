import { Database } from '@/@types/supabase'
import {
  OrderDataSchemaType,
  OrderSchemaType,
  PaymentDataSchemaType,
} from '@/schemas/payment/OrderSchema'
import { SupabaseClient } from '@supabase/supabase-js'
import { getOrderOwner } from './getServerOwner'
import { UserPreviewSchemaType } from '@/schemas/users/PreviewSchema'

export const getOrderById = async (
  supabase: SupabaseClient<Database>,
  id: string,
  userId: string,
): Promise<OrderSchemaType | void> => {
  const { data: orderData, error } = await supabase
    .from('orders')
    .select(
      `
      id, 
      ownerId:owner_id,
      transactionId:transaction_id,
      paymentData:payment_data,
      orderData:order_data,
      createdAt:created_at,
      updatedAt:updated_at
    `,
    )
    .eq('id', id)
    .eq('owner_id', userId)
    .single()

  if (error || !orderData) return

  const ownerUser = (await getOrderOwner(
    supabase,
    orderData.ownerId,
  )) as UserPreviewSchemaType

  return {
    id: orderData.id,
    ownerUser,
    transactionId: orderData.transactionId,
    orderData: orderData.orderData as OrderDataSchemaType,
    paymentData: orderData.paymentData as PaymentDataSchemaType | null,
    createdAt: new Date(orderData.createdAt).toISOString(),
    updatedAt: new Date(orderData.updatedAt).toISOString(),
  }
}
