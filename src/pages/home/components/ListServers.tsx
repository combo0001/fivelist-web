/* eslint-disable no-undef */
import { styled } from '@/styles'
import { RefObject, useEffect, useState } from 'react'

import { OrderValueEnum, useFilter } from '../providers/FilterProvider'
import { useServersList } from '../providers/ServersListProvider'
import { Advertising } from './Advertising'
import { Servers } from './Servers'
import { ServersHighlighted } from './ServersHighlighted'

interface ListServersProps {
  overflowComponent: RefObject<HTMLDivElement | null>
}

const ListContainer = styled('ol', {
  width: '100%',

  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  alignItems: 'center',

  padding: '0 $4 $4',

  '& > *': {
    flexShrink: 0,
    listStyleType: 'none',
  },
})

export const ListServers = ({
  overflowComponent,
}: ListServersProps): JSX.Element => {
  const { servers, newServers } = useServersList()
  const { serverName, serverLocation, orderBy } = useFilter()

  const [showAmount, setShowAmount] = useState<number>(20)

  const handleScroll = (event: Event) => {
    const target = event.target as HTMLDivElement

    const { scrollTop, scrollWidth, scrollHeight } = target
    const scrollPercent = scrollTop / (scrollHeight - scrollWidth)

    if (scrollPercent > 0.7) {
      setShowAmount(showAmount + 20)
    }
  }

  useEffect(() => {
    const scrollElement = overflowComponent.current

    scrollElement?.addEventListener('scroll', handleScroll)

    return () => scrollElement?.removeEventListener('scroll', handleScroll)
  })

  const serversToShow = servers
    .filter(({ cfx }) => {
      const filterName = serverName.toLowerCase()

      if (serverLocation && cfx.country.toUpperCase() !== serverLocation) {
        return false
      }

      return cfx.projectName.toLowerCase().includes(filterName)
    })
    .sort((a, b): number => {
      switch (orderBy) {
        case OrderValueEnum.Likes: {
          const likesA = a.preview?.page?.statistic.likes || 0
          const likesB = b.preview?.page?.statistic.likes || 0

          return likesB - likesA
        }
        case OrderValueEnum.Followers: {
          const followersA = a.preview?.page?.statistic.followers || 0
          const followersB = b.preview?.page?.statistic.followers || 0

          return followersB - followersA
        }
        case OrderValueEnum.Players:
          return b.cfx.playersCurrent - a.cfx.playersCurrent
        default:
          return 0
      }
    })
    .slice(0, showAmount)

  return (
    <ListContainer>
      <Advertising />

      {newServers.length > 0 && <ServersHighlighted servers={newServers} />}

      {servers.length > 0 && <Servers servers={serversToShow} />}
    </ListContainer>
  )
}
