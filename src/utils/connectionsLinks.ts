import { ConnectionsSchemaType } from '@/schemas/ConnectionSchema'

import * as discordService from '@/services/Discord'
import * as steamService from '@/services/Steam'
import { URLSearchParams } from 'url'

interface ConnectionOptionsProps {
  getRequestURL: (redirectURL: string) => string
  getPlatformIcon: () => React.ReactNode
  getUserIdentifier: (url: URLSearchParams) => Promise<string | null>
}

type ConnectionsUrlProps = {
  [key in ConnectionsSchemaType]: ConnectionOptionsProps
}

const CONNECTIONS: ConnectionsUrlProps = {
  DISCORD: discordService as ConnectionOptionsProps,
  STEAM: steamService as ConnectionOptionsProps,
}

export const getConnectionOptions = (
  connection: ConnectionsSchemaType,
): ConnectionOptionsProps => {
  return CONNECTIONS[connection]
}

export const getAvailableConnections = (): ConnectionsSchemaType[] => {
  const availableConnections = []

  for (const connection in CONNECTIONS) {
    availableConnections.push(connection)
  }

  return availableConnections as ConnectionsSchemaType[]
}
