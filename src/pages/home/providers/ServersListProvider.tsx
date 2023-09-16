import { ServerPreviewsSchemaType } from '@/schemas/servers/PreviewSchema'
import { ServerCitizenSchemaType } from '@/schemas/servers/CitizenSchema'
import { getAllMasterListServers } from '@/services/Fivem'

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { Context, createContext, useContext, useEffect, useState } from 'react'
import { ServerViewsSchemaType } from '@/schemas/servers/ViewSchema'

interface ServersListProviderProps {
  servers: ServerViewsSchemaType,
}

const ServersListCtx = createContext<ServersListProviderProps | null>(null)

export const ServersListProvider: React.FC<{
  children: React.ReactNode,
  servers: ServerPreviewsSchemaType,
  newServers: ServerPreviewsSchemaType
}> = ({
  children,
  newServers: previewNewServers,
  servers: previewServers
}) => {
    const [servers, setServers] = useState<ServerViewsSchemaType | null>(null)

    useEffect(() => {
      if (servers) return

      getAllMasterListServers()
        .then((citizenServers) => {
          const serversList: ServerViewsSchemaType = citizenServers.map((cfxServer) => {
            const previewServer = previewServers.find((previewServer) => previewServer.joinId === cfxServer.joinId)

            return {
              preview: previewServer || null,
              cfx: cfxServer,
            }
          })

          setServers(serversList)
        })

    }, [servers])

    return (
      <ServersListCtx.Provider
        value={{
          servers: servers as any,
        }}
      >
        {children}
      </ServersListCtx.Provider>
    )
  }

export const useServersList = () =>
  useContext<ServersListProviderProps>(ServersListCtx as Context<ServersListProviderProps>)
