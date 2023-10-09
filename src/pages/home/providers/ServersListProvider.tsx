import { ServerPreviewsSchemaType } from '@/schemas/servers/PreviewSchema'
import { ServerCitizenSchemaType } from '@/schemas/servers/CitizenSchema'
import { getAllMasterListServers } from '@/services/Fivem'

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { Context, createContext, useCallback, useContext, useEffect, useState } from 'react'
import { ServerViewsSchemaType } from '@/schemas/servers/ViewSchema'
import { trpc } from '@/utils/trpc'

interface ServersListProviderProps {
  servers: ServerViewsSchemaType
  newServers: ServerViewsSchemaType
  likeServer: (pageId: string) => Promise<boolean>
}

const ServersListCtx = createContext<ServersListProviderProps | null>(null)

export const ServersListProvider: React.FC<{
  children: React.ReactNode,
  servers: ServerPreviewsSchemaType,
  newServers: any[]
}> = ({
  children,
  newServers,
  servers: previewServers
}) => {
    const [servers, setServers] = useState<ServerViewsSchemaType | null>(null)
    const trySetUserLike = trpc.users.trySetUserLike.useMutation()

    const likeServer = useCallback(
      async (pageId: string): Promise<boolean> => {
        const wasSuccess = await trySetUserLike.mutateAsync({ pageId })

        if (!wasSuccess) {
          return false 
        }

        setServers(
          (state) => {
            if (!state) return state

            return state.map((server) => {
              if (!server.preview?.page || server.preview.page.id !== pageId) return server

              return {
                ...server,
                preview: {
                  ...server.preview,
                  page: {
                    ...server.preview.page,
                    statistic: {
                      ...server.preview.page.statistic,
                      likes: server.preview.page.statistic.likes + 1,
                    }
                  },
                },
              }
            })
          }
        )

        return true 
      }, 
      [servers]
    )

    useEffect(() => {
      if (servers) return

      getAllMasterListServers()
        .then((citizenServers) => {
          const serversList: ServerViewsSchemaType = citizenServers.map((cfxServer) => {
            const previewServer = previewServers.find((previewServer) => previewServer.joinId === cfxServer.joinId)

            return {
              preview: previewServer || null,
              cfx: {
                ...cfxServer,
                projectName: cfxServer.projectName.replace(/\^\d/g, ''),
              },
            }
          })

          setServers(serversList)
        })

    }, [servers])

    return (
      <ServersListCtx.Provider
        value={{
          servers: servers || [],
          newServers,
          likeServer
        }}
      >
        {children}
      </ServersListCtx.Provider>
    )
  }

export const useServersList = () =>
  useContext<ServersListProviderProps>(ServersListCtx as Context<ServersListProviderProps>)
