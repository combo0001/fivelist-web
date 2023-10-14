import { z } from 'zod'

export const PayerPaymentMethodEnum = z.enum(['TICKET', 'PIX', 'CREDIT_CARD'])

export type PayerPaymentMethodEnumType = z.infer<typeof PayerPaymentMethodEnum>
