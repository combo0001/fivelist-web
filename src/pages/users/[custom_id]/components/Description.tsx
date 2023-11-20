/* eslint-disable no-undef */
import { styled } from '@/styles'
import { Heading, Text } from '@5list-design-system/react'
import { useUserView } from '../providers/UserViewProvider'
import { useTranslation } from 'react-i18next'

const DescriptionWrapper = styled('div', {
  minHeight: '10.75rem',

  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: '1fr',

  background: '$neutral800',
  borderRadius: '$lg',

  '& > *': {
    gridRow: 1,
    gridColumn: 1,
  },
})

const DescriptionContainer = styled('div', {
  padding: '$9 $6',

  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
})

export const Description = (): JSX.Element => {
  const { user } = useUserView()
  const { t } = useTranslation('pages')

  const hasVip = user.planTier.privileges.PROFILE_DESCRIPTION
  const text =
    hasVip && user.page.description
      ? user.page.description
      : t('usersPage.descriptionSection.withoutDescription')

  return (
    <DescriptionWrapper>
      <DescriptionContainer>
        <Heading as={'h5'} weight={'bold'}>
          {t('usersPage.descriptionSection.title')}
        </Heading>

        <Text size={'sm'}>{text}</Text>
      </DescriptionContainer>
    </DescriptionWrapper>
  )
}
