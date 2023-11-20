/* eslint-disable no-undef */

import { PlayIcon } from '@/components/Icons'
import { styled } from '@/styles'
import { Button, Heading, Text } from '@5list-design-system/react'
import { useTranslation } from 'react-i18next'

interface StreamLinkProps {
  url: string | null
}

const StreamLinkContainer = styled('div', {
  height: '$50',

  padding: '$6',

  background: '$neutral800',
  borderRadius: '$lg',

  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
})

const LinkBox = styled('div', {
  height: '$10',

  border: '0.0625rem solid $neutral700',
  borderRadius: '1.25rem',

  display: 'flex',
  alignItems: 'center',

  padding: '0.625rem $4',
})

const ButtonAnchor = styled('a', {
  all: 'unset',
})

export const StreamLink = ({ url }: StreamLinkProps): JSX.Element => {
  const { t } = useTranslation('pages')
  
  return (
    <StreamLinkContainer>
      <Heading as={'h4'} weight={'bold'}>
        {t('usersPage.liveSection.title')}
      </Heading>

      <LinkBox>
        <Text size={'sm'}>{url || t('usersPage.liveSection.withoutLive')}</Text>
      </LinkBox>

      <ButtonAnchor aria-disabled={!url} href={url || '#'} target={'_blank'}>
        <Button disabled={!url}>
          {t('usersPage.liveSection.joinInLive')}
          <PlayIcon css={{ size: '$4', fill: '$white' }} />
        </Button>
      </ButtonAnchor>
    </StreamLinkContainer>
  )
}
