/* eslint-disable no-undef */
import { styled } from '@/styles'

import { Advertising } from './Advertising'
import { Servers } from './Servers'
import { ServersHighlighted } from './ServersHighlighted'
import { useServersList } from '../providers/ServersListProvider'
import { useEffect, useState } from 'react'

interface ListServersProps {
  overflowComponent: HTMLDivElement | null
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

export const ListServers = ({ overflowComponent }: ListServersProps): JSX.Element => {
  const { servers } = useServersList()

  const [showAmount, setShowAmount] = useState<number>(20)

  const handleScroll = (event: Event) => {
    const target = event.target as HTMLDivElement

    const { scrollTop, scrollWidth, scrollHeight } = target
    const scrollPercent = (scrollTop / (scrollHeight - scrollWidth))

    if (scrollPercent > 1) {
      setShowAmount(showAmount + 20)
    }
  }

  useEffect(()=>{
    if (!overflowComponent) return

    overflowComponent.addEventListener('scroll', handleScroll)

    return () => overflowComponent.removeEventListener('scroll', handleScroll)
  })

  return (
    <ListContainer>
      <Advertising />

      <ServersHighlighted servers={[ ]} />

      {
        servers ? 
          <Servers servers={servers.slice(0, showAmount)} />
        :
          <h1>Loading...</h1> 
      }
    </ListContainer>
  )
}
