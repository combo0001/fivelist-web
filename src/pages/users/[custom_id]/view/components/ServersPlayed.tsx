/* eslint-disable no-undef */

import { Tag } from '@/components/Tag'
import { styled } from '@/styles'
import { Heading, Text } from '@5list-design-system/react'

type ServerPlayedObject = {
  server: ServersType.ServerObject
  hours: number
}

interface ServersPlayedProps {
  servers: ServerPlayedObject[]
}

const ServersContainer = styled('div', {
  height: 'fit-content',
  padding: '$6',

  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  border: '0.0625rem solid $neutral700',
  borderRadius: '$lg',

  overflow: 'hidden',
})

export const ServersPlayed = ({ servers }: ServersPlayedProps): JSX.Element => {
  return (
    <ServersContainer>
      <Heading as={'h4'} weight={'bold'}>
        Mais jogados
      </Heading>

      {servers.map((server, index) => (
        <ServerPlayed key={index} {...server} />
      ))}
    </ServersContainer>
  )
}

interface ServerPlayedProps {
  server: ServersType.ServerObject
  hours: number
}

const ServerContainer = styled('div', {
  border: '0.0625rem solid $neutral700',
  borderRadius: '$lg',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  height: '$20',
  padding: '0 $4',
})

const ServerInformationsContainer = styled('div', {
  maxWidth: '80%',

  display: 'flex',
  flexDirection: 'column',
  gap: '$1',
})

const NameText = styled(Text, {
  fontFamily: "'Poppins', sans-serif",
  fontStyle: 'normal',

  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
})

const TagsContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',
})

const HoursText = styled(Text, {
  textAlign: 'center',
  whiteSpace: 'pre-wrap',
  lineHeight: '150%',

  width: '$20',
})

const ServerPlayed = ({ server, hours }: ServerPlayedProps): JSX.Element => {
  return (
    <ServerContainer>
      <ServerInformationsContainer>
        <NameText color={'$neutral100'} size={'md'} weight={'bold'}>
          {server.name}
        </NameText>

        <TagsContainer>
          <Tag active>{server.clients.now} Online</Tag>
          <Tag>{server.followers} Seguidores</Tag>
          <Tag>{server.reviews} Avaliações</Tag>
        </TagsContainer>
      </ServerInformationsContainer>

      <HoursText>{hours} horas jogadas</HoursText>
    </ServerContainer>
  )
}
