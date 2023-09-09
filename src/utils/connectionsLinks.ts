import { ConnectionsSchemaType } from '@/schemas/ConnectionSchema'

import * as discordService from '@/services/discordOAuth2'
import * as steamService from '@/services/discordOAuth2'

interface ConnectionOptionsProps {
  getRequestURL: (redirectURL: string) => string
  getPlatformIcon: () => React.ReactNode
}

type ConnectionsUrlProps = {
  [key in ConnectionsSchemaType]: ConnectionOptionsProps
}

const CONNECTIONS: ConnectionsUrlProps = {
  DISCORD: discordService,
  STEAM: steamService,
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
