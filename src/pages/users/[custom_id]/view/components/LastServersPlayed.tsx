/* eslint-disable no-undef */

import { styled } from '@/styles'
import { Button, Heading } from '@5list-design-system/react'
import { useState } from 'react'

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
  gap: '$8',

  border: '0.0625rem solid $neutral700',
  borderRadius: '$lg',

  overflow: 'hidden',
})

const ListContainer = styled('ol', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  '& > *': {
    listStyleType: 'none',
  },
})

export const LastServersPlayed = ({
  servers,
}: ServersPlayedProps): JSX.Element => {
  const [showMore, setShowMore] = useState<boolean>(false)

  const toggleShowMore = () => setShowMore((status) => !status)

  const isNeedShowMore = servers.length > 2

  return (
    <ServersContainer>
      <Heading as={'h4'} weight={'bold'}>
        Últimos servidores jogados
      </Heading>

      {servers.length > 0 ? (
        <ListContainer>
          {servers
            .filter((_, index) => showMore || index < 2)
            .map(({ isOnline, hoursPlayed, server }, index) => (
              <Server
                key={index}
                server={server}
                hoursPlayed={hoursPlayed}
                isOnline={isOnline}
                showOnline
              />
            ))}
        </ListContainer>
      ) : (
        <Heading as={'h5'} color={'$neutral100'}>
          Nenhum servidor registrado.
        </Heading>
      )}

      {isNeedShowMore && (
        <Button
          css={{ alignSelf: 'center' }}
          size={'lg'}
          outlined
          onClick={toggleShowMore}
        >
          {!showMore ? 'Carregar Mais' : 'Carregar Menos'}
        </Button>
      )}
    </ServersContainer>
  )
}
