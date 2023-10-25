/* eslint-disable no-undef */

import { useTranslation } from 'react-i18next'
import { styled } from '@/styles'
import { Text } from '@5list-design-system/react'
import Image from 'next/image'
import Link from 'next/link'

const ServerContainer = styled('div', {
  flexShrink: 0,

  width: '10.75rem',

  background: '$neutral800',
  borderRadius: '$lg',

  display: 'flex',
  flexDirection: 'column',

  cursor: 'pointer',
})

const ServerImage = styled(Image, {
  width: '100%',
  height: '11.625rem',
})

const ServerInformationsBox = styled('div', {
  padding: '$4 $3',

  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
})

const ServerTitleText = styled(Text, {
  maxWidth: '100%',
  whiteSpace: 'nowrap',

  textOverflow: 'ellipsis',
})

const ServerTagBox = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  '&::before': {
    content: '',
    display: 'inline-block',

    background: '$success400',
    size: '$2',
    borderRadius: '$full',
  },
})

export const ServerHighlighted = ({
  bannerURL,
  name,
  clients,
  cfxHash,
}: ServerHighlightedProps): JSX.Element => {
  const { t } = useTranslation('pages')
  
  return (
    <Link href={`/servers/${cfxHash}`} legacyBehavior>
      <ServerContainer>
        <ServerImage
          src={bannerURL}
          alt={'Banner of server'}
          width={172}
          height={186}
        />

        <ServerInformationsBox>
          <ServerTitleText color={'$white'} size={'sm'} weight={'bold'}>
            {name}
          </ServerTitleText>

          <ServerTagBox>
            <Text size={'xs'} weight={'bold'}>
              {clients.now}{' '}{t('home.highlightedServersLabels.playersAmount')}
            </Text>
          </ServerTagBox>
        </ServerInformationsBox>
      </ServerContainer>
    </Link>
  )
}
