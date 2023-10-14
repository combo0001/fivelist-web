import { procedure } from '@/server/trpc'
import { z } from 'zod'
import { isUserValid } from '../../users/utils/isUserValid'
import { OrderDataSchema } from '@/schemas/payment/OrderSchema'

const OrderDataInputSchema = z.object({
  orderId: z.string().uuid(),
  orderData: OrderDataSchema
})

const OrderDataOutputSchema = z.boolean()

export const updateOrderData = procedure
  .input(OrderDataInputSchema)
  .output(OrderDataOutputSchema)
  .mutation(async ({ input, ctx }) => {
    const { supabase, session } = ctx

    if (!supabase || !session || !isUserValid(session)) return false

    const { error } = await supabase
      .from('orders')
      .update({
        order_data: input.orderData
      })
      .eq('id', input.orderId)
      .eq('owner_id', session.user.id)

    if (error) return false

    return true
  })
