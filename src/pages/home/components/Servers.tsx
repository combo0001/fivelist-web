/* eslint-disable no-undef */

import { styled } from '@/styles'
import { Heading } from '@5list-design-system/react'

import { Advertising } from './Advertising'
import { Server } from './Server'

interface ServersProps {
  servers: ServersType.ServerObject[]
}

const ServersContainer = styled('div', {
  width: '100%',

  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
})

export const Servers = ({ servers }: ServersProps): JSX.Element => {
  const serversContent = servers.map((server, index) => {
    let advertisingContent: React.ReactNode

    if (index > 0 && index % 6 === 0) {
      advertisingContent = <Advertising key={index} />
    }

    return (
      <>
        {advertisingContent}
        <Server key={index} position={index + 1} {...server} />
      </>
    )
  })

  return (
    <ServersContainer>
      <Heading as={'h5'} weight={'bold'}>
        Lista de servidores
      </Heading>

      {serversContent}
    </ServersContainer>
  )
}
