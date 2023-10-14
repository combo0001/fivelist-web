import { procedure } from '@/server/trpc'
import { z } from 'zod'
import { isUserValid } from '../../users/utils/isUserValid'
import { OrderDataSchema, OrderIdSchema } from '@/schemas/payment/OrderSchema'

const OrderInputSchema = z.object({
  orderData: OrderDataSchema,
})

const OrderOutputSchema = z.union([z.null(), OrderIdSchema])

export const createOrder = procedure
  .input(OrderInputSchema)
  .output(OrderOutputSchema)
  .mutation(async ({ input, ctx }) => {
    const { supabase, session } = ctx

    if (!supabase || !session || !isUserValid(session)) return null

    const { data: orderData, error } = await supabase
      .from('orders')
      .insert({
        owner_id: session.user.id,
        order_data: input.orderData,
      })
      .select('id')
      .single()

    if (error || !orderData) return null

    return orderData.id
  })
