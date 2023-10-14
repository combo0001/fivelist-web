import { router } from '../../trpc'
import { getOrder } from './handlers/getOrder'
import { createOrder } from './handlers/createOrder'
import { updateOrderData } from './handlers/updateOrderData'
import { payOrder } from './handlers/payOrder'

export const paymentsRouter = router({
  getOrder,
  createOrder,
  updateOrderData,
  payOrder,
})
