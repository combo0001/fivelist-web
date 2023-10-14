type PaymentTypeIdEnum = 'boleto' | 'pix'
type TransactionStatusEnum = 'pending' | 'approved' | 'refused'

export interface TransactionRequestType {
  description: string
  payment_type: PaymentTypeIdEnum
  payment_gateway: string
  amount: number
  payer: {
    identification_type: 'CPF'
    identification_number: string
    firstName: string
    lastName: string
    email: string
    address: {
      address_number: number
      address_street: string
      address_zip: string
      address_neighborhood: string
      address_city: string
      address_state: string
    }
  }
}

export interface TransactionResponseType {
  gwTransactionId: number
  gwTransactionStatus: TransactionStatusEnum
  gwTransactionUrl: string
  gwTransactionAmount: number 
  gwTransactionType: PaymentTypeIdEnum
  gwTransactionIdempotency: string
}

export interface SubscriptionRequestType {
  reason: string,
  billing_day: string,
  amount: number,
  payment_type: string,
}

export interface SubscriptionResponseType {
  gwSubscriptionTransactionId: string
  gwSubscriptionTransactionCheckoutUrl: string
  gwSubscriptionTransactionCreateData: string
  gwSubscriptionTransactionCollectorId: number
  gwSubscriptionTransactionStatus: string
}