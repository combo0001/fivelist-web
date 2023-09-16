/* eslint-disable no-undef */

import { styled, css } from '@/styles'
import { Heading } from '@5list-design-system/react'

import { Advertising } from './Advertising'
import { Server } from './Server'
import { ServerViewsSchemaType } from '@/schemas/servers/ViewSchema'

interface ServersProps {
  servers: ServerViewsSchemaType
}

const ServersContainer = styled('div', {
  width: '100%',

  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
})

const ServerWithAdvertisingBox = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
})

export const Servers = ({ servers }: ServersProps): JSX.Element => {
  return (
    <ServersContainer>
      <Heading as={'h5'} weight={'bold'}>
        Lista de servidores
      </Heading>

      {
        servers
          .map((server, index) => {
            let advertisingContent: React.ReactNode

            if (index > 0 && index % 6 === 0) {
              advertisingContent = <Advertising key={index} />
            }

            return (
              <ServerWithAdvertisingBox key={index}>
                {advertisingContent}
                <Server position={index + 1} {...server} />
              </ServerWithAdvertisingBox>
            )
          })
      }
    </ServersContainer>
  )
}
