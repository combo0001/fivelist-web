/* eslint-disable no-undef */

import { PlayIcon } from '@/components/Icons'
import { styled } from '@/styles'
import { Button, Heading, Text } from '@5list-design-system/react'

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
  return (
    <StreamLinkContainer>
      <Heading as={'h4'} weight={'bold'}>
        Live
      </Heading>

      <LinkBox>
        <Text size={'sm'}>{url || 'Nenhum url encontrado.'}</Text>
      </LinkBox>

      <ButtonAnchor aria-disabled={!url} href={url || '#'} target={'_blank'}>
        <Button disabled={!url}>
          Acessar
          <PlayIcon css={{ size: '$4', fill: '$white' }} />
        </Button>
      </ButtonAnchor>
    </StreamLinkContainer>
  )
}
