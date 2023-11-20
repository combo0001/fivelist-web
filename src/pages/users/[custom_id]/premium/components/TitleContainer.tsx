/* eslint-disable no-undef */
import { styled } from '@/styles'
import { Heading, Text } from '@5list-design-system/react'
import { usePremium } from '../providers/PremiumProvider'
import { OfferContainer } from './OfferSelection'
import { useTranslation } from 'react-i18next'

const TitleWrapper = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$6',

  width: '35.5rem',
})

const TagContainer = styled('div', {
  padding: '$2',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  background: '$neutral800',
  borderRadius: '$lg',
})

export const TitleContainer = (): JSX.Element => {
  const { offer, changeOffer } = usePremium()
  const { t } = useTranslation('pages')

  return (
    <TitleWrapper>
      <TagContainer>
        <Text size={'xs'} weight={'bold'} css={{ lineHeight: '100%' }}>
          {t('usersPagePremium.plansForUsers')}
        </Text>
      </TagContainer>

      <Heading as={'h3'} weight={'bold'} css={{ textAlign: 'center' }}>
        {t('usersPagePremium.plansHeader')}
      </Heading>

      <OfferContainer offer={offer} onChange={changeOffer} />
    </TitleWrapper>
  )
}
