import { OfferEnumSchemaType } from '@/schemas/PremiumSchema'

export const getOfferMultiplier = (offer: OfferEnumSchemaType): number => {
  switch (offer) {
    case 'MONTHLY':
      return 1
    case 'QUARTERLY':
      return 3
    case 'YEARLY':
      return 12
  }
}
