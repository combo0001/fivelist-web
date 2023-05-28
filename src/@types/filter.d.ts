/* eslint-disable no-unused-vars */

type React = import('react')

declare namespace FilterType {
  type OrderServers = 'likes'

  interface Provider {
    serverName: string
    playerName: string
    serverLocation: string
    orderBy: OrderServers
    setServerName: React.Dispatch<React.SetStateAction<string>>
    setPlayerName: React.Dispatch<React.SetStateAction<string>>
    setServerLocation: React.Dispatch<React.SetStateAction<string>>
    setOrderBy: React.Dispatch<React.SetStateAction<OrderServers>>
  }
}
