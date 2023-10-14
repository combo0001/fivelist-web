import { procedure } from '@/server/trpc'
import { z } from 'zod'
import { isUserValid } from '../../users/utils/isUserValid'
import { PaymentDataSchema } from '@/schemas/payment/OrderSchema'
import { getOrderById } from '../utils/getOrderById'
import { payWithoutAutoCharge } from '../utils/payWithoutAutoCharge'
import { payWithAutoCharge } from '../utils/payWithAutoCharge'

const OrderPaymentInputSchema = z.object({
  orderId: z.string().uuid(),
  paymentData: PaymentDataSchema,
})

const OrderPaymentOutputSchema = z.object({
  success: z.boolean(),
  redirectURL: z.string().url().optional(),
})

export const payOrder = procedure
  .input(OrderPaymentInputSchema)
  .output(OrderPaymentOutputSchema)
  .mutation(async ({ input, ctx }) => {
    const { supabase, session } = ctx

    if (!supabase || !session || !isUserValid(session))
      return { success: false }

    const order = await getOrderById(supabase, input.orderId, session.user.id)

    if (!order) return { success: false }

    switch (input.paymentData.paymentMethod) {
      case 'TICKET':
      case 'PIX':
        return payWithoutAutoCharge(supabase, order, input.paymentData)
      case 'CREDIT_CARD':
        return payWithAutoCharge(supabase, order, input.paymentData)
      default:
        return { success: false }
    }
  })
