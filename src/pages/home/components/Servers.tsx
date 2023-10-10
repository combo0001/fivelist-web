/* eslint-disable no-undef */

import { styled } from '@/styles'
import { Heading } from '@5list-design-system/react'

import { Advertising } from './Advertising'
import { Server } from './Server'
import { ServerViewsSchemaType } from '@/schemas/servers/ViewSchema'
import { trpc } from '@/utils/trpc'
import { useServersList } from '../providers/ServersListProvider'

import { toast } from 'react-toastify'
import { useClientUser } from '@/providers/UserProvider'
import { useRouter } from 'next/navigation'

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
  const { user } = useClientUser()
  const { likeServer } = useServersList()
  const router = useRouter()

  const { data: currentLike, isFetched, refetch } = trpc.users.getUserCurrentLike.useQuery()

  const handleOnLike = async (pageId?: string): Promise<void> => {
    if (!user) {
      router.push('/signin')

      return 
    }

    const actionPromise: Promise<void> = new Promise((resolve, reject) => { 
      if (pageId) {
        likeServer(pageId)
          .then((wasSuccess): void => {
            if (wasSuccess) {
              refetch()

              return resolve()
            } else {
              return reject()
            }
          })
      } else {
        return reject()
      }
    })

    toast.promise(
      actionPromise,
      {
        pending: 'Aplicando o Like...',
        success: 'Like aplicado com sucesso',
        error: 'Algo deu errado ao aplicar o Like'
      }
    )
    
    return await actionPromise 
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