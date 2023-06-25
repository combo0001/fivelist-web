/* eslint-disable no-undef */
import { Tag } from '@/components/Tag'
import { styled } from '@/styles'
import { Text } from '@5list-design-system/react'

interface ServerPlayedProps {
  server: ServersType.ServerObject
  hoursPlayed: number
  isOnline: boolean
  showOnline?: boolean
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

export const Server = ({
  server,
  hoursPlayed,
  isOnline,
  showOnline,
}: ServerPlayedProps): JSX.Element => {
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

      {showOnline && isOnline ? (
        <HoursText weight={'bold'} color={'$success600'}>
          Online
        </HoursText>
      ) : (
        <HoursText>{hoursPlayed} horas jogadas</HoursText>
      )}
    </ServerContainer>
  )
}
