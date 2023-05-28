/* eslint-disable no-undef */
import { styled } from '@/styles'
import { Server } from './Server'

interface ListServersProps {
  servers: ListType.Server[]
}

const ServersContainer = styled('ol', {
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

const AdvertisingContainer = styled('div', {
  width: '100%',
  height: '5.625rem',

  background: '$neutral800',
  borderRadius: '$lg',
})

export const ListServers = ({ servers }: ListServersProps): JSX.Element => {
  const serversContent = servers.map((server, index) => {
    let advertisingContent: React.ReactNode

    if (index % 6 === 0) {
      advertisingContent = (
        <AdvertisingContainer key={index}></AdvertisingContainer>
      )
    }

    return (
      <>
        {advertisingContent}
        <Server key={index} position={index + 1} {...server} />
      </>
    )
  })

  return <ServersContainer>{serversContent}</ServersContainer>
}
