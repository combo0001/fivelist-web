/* eslint-disable no-undef */

import { styled } from '@/styles'
import { Heading } from '@5list-design-system/react'

import { Advertising } from './Advertising'
import { Server } from './Server'
import { ServerViewsSchemaType } from '@/schemas/servers/ViewSchema'
import { trpc } from '@/utils/trpc'
import { useServersList } from '../providers/ServersListProvider'

import { toast } from 'react-toastify'

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
  const { data: currentLike, isFetched, refetch } = trpc.users.getUserCurrentLike.useQuery()
  const { likeServer } = useServersList()

  const handleOnLike = (pageId?: string): Promise<void> => {
    const actionPromise: Promise<void> = new Promise((resolve, reject) => { 
      if (pageId) {
        likeServer(pageId)
          .then(async (wasSuccess): Promise<void> => {
            if (wasSuccess) {
              await refetch()

              return resolve()
            } else {
              return reject()
            }
          })
      }

      return resolve()
    })

    toast.promise(
      actionPromise,
      {
        pending: 'Aplicando o Like...',
        success: 'Like aplicado com sucesso',
        error: 'Algo deu errado ao aplicar o Like'
      }
    )
    
    return actionPromise 
  }
  return (
    <ServersContainer>
      <Heading as={'h5'} weight={'bold'}>
        Lista de servidores
      </Heading>

      {
        isFetched && 
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