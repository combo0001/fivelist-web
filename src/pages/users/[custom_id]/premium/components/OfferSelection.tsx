/* eslint-disable no-undef */
import { styled } from '@/styles'
import { OfferEnumSchemaType } from '@/schemas/PremiumSchema'
import { useTranslation } from 'react-i18next'

interface OfferContainerProps {
  offer: OfferEnumSchemaType
  onChange: (offer: OfferEnumSchemaType) => Promise<void>
}

const OfferWrapper = styled('section', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.125rem',

  height: '$12',
  overflow: 'hidden',

  background: 'transparent',
  borderRadius: '$lg',
})

const OfferButton = styled('button', {
  all: 'unset',
  height: '100%',

  display: 'flex',
  alignItems: 'center',

  padding: '0 $8',
  cursor: 'pointer',

  '&:hover': {
    opacity: 0.8,
  },

  variants: {
    selected: {
      true: {
        background: '$neutral700',
      },
      false: {
        background: '$neutral800',
      },
    },
  },
})

export const OfferContainer = ({
  offer,
  onChange,
}: OfferContainerProps): JSX.Element => {
  const { t } = useTranslation('pages')

  return (
    <OfferWrapper>
      <OfferButton
        selected={offer === 'MONTHLY'}
        onClick={onChange.bind(null, 'MONTHLY')}
      >
        {t('usersPagePremium.monthly')}
      </OfferButton>

      <OfferButton
        selected={offer === 'QUARTERLY'}
        onClick={onChange.bind(null, 'QUARTERLY')}
      >
        {t('usersPagePremium.quarterly')}
      </OfferButton>

      <OfferButton
        selected={offer === 'YEARLY'}
        onClick={onChange.bind(null, 'YEARLY')}
      >
        {t('usersPagePremium.yearly')}
      </OfferButton>
    </OfferWrapper>
  )
}
