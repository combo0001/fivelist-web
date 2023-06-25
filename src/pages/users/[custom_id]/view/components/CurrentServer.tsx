/* eslint-disable no-undef */

import { Tag } from '@/components/Tag'
import { styled } from '@/styles'
import { Button, Text } from '@5list-design-system/react'
import Link from 'next/link'

interface CurrentServerProps extends ServersType.ServerObject {}

const ServerContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$10',

  maxWidth: '100%',
  height: '$20',

  padding: '0 $4',
})

const TitleContainer = styled('div', {
  flex: 1,

  display: 'flex',
  flexDirection: 'column',
  gap: '$1',
})

const NameText = styled(Text, {
  fontFamily: "'Poppins', sans-serif",
  fontStyle: 'normal',

  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',

  maxWidth: '70%',
  cursor: 'pointer',
})

const TagsContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  width: 'fit-content',
})

export const CurrentServer = ({
  clients,
  name,
  followers,
  reviews,
  cfxHash,
}: CurrentServerProps): JSX.Element => {
  return (
    <ServerContainer>
      <TitleContainer>
        <Link href={`/servers/${cfxHash}`} legacyBehavior>
          <NameText>
            {name}{' '}
            AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
          </NameText>
        </Link>

        <TagsContainer>
          <Tag active>{clients.now} jogando</Tag>
          <Tag>{followers} seguidores</Tag>
          <Tag>{reviews} avaliações</Tag>
        </TagsContainer>
      </TitleContainer>

      <Text color={'$success600'} size={'sm'} weight={'bold'}>
        Jogando agora
      </Text>

      <Link href={`/servers/${cfxHash}`} legacyBehavior>
        <Button>Conhecer agora</Button>
      </Link>
    </ServerContainer>
  )
}
