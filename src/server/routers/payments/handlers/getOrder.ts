import { procedure } from '@/server/trpc'
import { z } from 'zod'
import { OrderDataSchemaType, OrderIdSchema, OrderSchema, PaymentDataSchemaType } from '@/schemas/payment/OrderSchema'
import { isUserValid } from '../../users/utils/isUserValid'
import { getOrderOwner } from '../utils/getServerOwner'
import { UserPreviewSchemaType } from '@/schemas/users/PreviewSchema'
import { getOrderById } from '../utils/getOrderById'

const OrderInputSchema = z.object({
  id: z.union([ z.undefined(), OrderIdSchema ]),
})

const OrderOutputSchema = z.union([z.null(), OrderSchema])

export const getOrder = procedure
  .input(OrderInputSchema)
  .output(OrderOutputSchema)
  .query(async ({ ctx, input }) => {
    if (!input.id) return null

    const { supabase, session } = ctx

    if (!supabase || !session || !isUserValid(session)) return null
  
    const order = await getOrderById(supabase, input.id, session.user.id)

    if (!order) return null

    return order
  })
