/* eslint-disable no-undef */
import { styled } from '@/styles'

import { Advertising } from './Advertising'
import { Servers } from './Servers'
import { ServersHighlighted } from './ServersHighlighted'

interface ListServersProps {
  servers: ServersType.ServerObject[]
  newServers: ServersType.ServerObject[]
}

const ListContainer = styled('ol', {
  width: '100%',
  flex: 1,

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
