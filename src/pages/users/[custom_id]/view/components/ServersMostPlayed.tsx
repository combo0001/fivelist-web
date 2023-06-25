/* eslint-disable no-undef */

import { styled } from '@/styles'
import { Heading } from '@5list-design-system/react'

import { Server } from './Server'

type ServerPlayedObject = {
  server: ServersType.ServerObject
  hoursPlayed: number
  isOnline: boolean
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

export const ServersMostPlayed = ({
  servers,
}: ServersPlayedProps): JSX.Element => {
  return (
    <ServersContainer>
      <Heading as={'h4'} weight={'bold'}>
        Mais jogados
      </Heading>

      {servers.length > 0 ? (
        servers.map(({ isOnline, hoursPlayed, server }, index) => (
          <Server
            key={index}
            server={server}
            hoursPlayed={hoursPlayed}
            isOnline={isOnline}
          />
        ))
      ) : (
        <Heading as={'h5'} color={'$neutral100'}>
          Nenhum servidor registrado.
        </Heading>
      )}
    </ServersContainer>
  )
}
