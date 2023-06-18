/* eslint-disable no-undef */
import { styled } from '@/styles'

import { ServersHighlighted } from './ServersHighlighted'
import { Servers } from './Servers'
import { Advertising } from './Advertising'

interface ListServersProps {
  servers: ServersType.ServerObject[]
  newServers: ServersType.ServerObject[]
}

const ListContainer = styled('ol', {
  width: '100%',
  maxHeight: '100%',

  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  alignItems: 'center',

  padding: '0 $4 $4',

  overflow: 'auto',
  scrollbarWidth: 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },

  '& > *': {
    flexShrink: 0,
    listStyleType: 'none',
  },
})

export const ListServers = ({
  newServers,
  servers,
}: ListServersProps): JSX.Element => {
  return (
    <ListContainer>
      <Advertising />

      <ServersHighlighted servers={newServers} />

      <Servers servers={servers} />
    </ListContainer>
  )
}
