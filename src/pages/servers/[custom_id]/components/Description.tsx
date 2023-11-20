/* eslint-disable no-undef */
import { styled } from '@/styles'
import { Button, Heading, Text } from '@5list-design-system/react'
import { useState } from 'react'
import { useServerView } from '../providers/ServerViewProvider'
import { useTranslation } from 'react-i18next'

const DescriptionWrapper = styled('div', {
  minHeight: '11.25rem',

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
  gap: '$3',
})

const DescriptionText = styled(Text, {
  textOverflow: 'clip',

  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  textJustify: 'inter-character',
})

const DescriptionBlurContainer = styled('div', {
  background: 'rgba(29, 29, 29, 0.25)',
  backdropFilter: 'blur(0.125rem)',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const Description = (): JSX.Element => {
  const { t } = useTranslation('pages')
  const [showMore, setShowMore] = useState<boolean>(false)

  const { serverView } = useServerView()

  const hasVip = serverView.page.planTier.privileges.PAGE_DESCRIPTION
  const text =
    hasVip && serverView.page.description
      ? serverView.page.description
      : t('serversPage.descriptionSection.withoutDescription')

  const toggleMode = (): void => {
    setShowMore((state) => !state)
  }

  return (
    <DescriptionWrapper>
      <DescriptionContainer>
        <Heading as={'h5'} weight={'bold'}>
          {t('serversPage.descriptionSection.title')}
        </Heading>

        <DescriptionText size={'sm'}>
          {showMore ? text : text.substring(0, 128)}

          {text.length > 128 && (
            <>
              {!showMore && '...'}
              <Text
                as={'span'}
                size={'sm'}
                color={'$white'}
                css={{ cursor: 'pointer', marginLeft: '$3' }}
                onClick={toggleMode}
              >
                {showMore ? t('serversPage.descriptionSection.showLess') : t('serversPage.descriptionSection.showMore')}
              </Text>
            </>
          )}
        </DescriptionText>
      </DescriptionContainer>

      {!hasVip && (
        <DescriptionBlurContainer>
          <Button size={'lg'} css={{ pointerEvents: 'none' }}>
            {t('serversPage.descriptionSection.withoutPremium')}
          </Button>
        </DescriptionBlurContainer>
      )}
    </DescriptionWrapper>
  )
}
