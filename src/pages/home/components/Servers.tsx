/* eslint-disable no-undef */

import { styled, css } from '@/styles'
import { Heading } from '@5list-design-system/react'

import { Advertising } from './Advertising'
import { Server } from './Server'
import { ServerViewsSchemaType } from '@/schemas/servers/ViewSchema'
import { trpc } from '@/utils/trpc'

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
  const { data: currentLike, refetch } = trpc.users.getUserCurrentLike.useQuery()
  const setUserLike = trpc.users.setUserLike.useMutation()

  const handleOnLike = async (pageId?: string): Promise<void> => {
    if (!pageId) return 
    
    await setUserLike.mutateAsync({ pageId: pageId })
    await refetch()
  }
  return (
    <ServersContainer>
      <Heading as={'h5'} weight={'bold'}>
        Lista de servidores
      </Heading>

      {
        servers
          .map((server, index) => {
            const isLiked = !!server.preview?.page && currentLike?.page.id === server.preview.page.id

            let advertisingContent: React.ReactNode

            if (index > 0 && index % 6 === 0) {
              advertisingContent = <Advertising key={index} />
            }

            return (
              <ServerWithAdvertisingBox key={index}>
                {advertisingContent}
                <Server 
                  position={index + 1} 
                  canLike={!currentLike}
                  isLiked={isLiked}
                  onLike={handleOnLike.bind(null, server.preview?.page?.id)}
                  {...server} 
                />
              </ServerWithAdvertisingBox>
            )
          })
      }
    </ServersContainer>
  )
}
