import { ServerDynamicSchemaType } from '@/schemas/servers/DynamicSchema'
import { ServerProfileSchemaType } from '@/schemas/servers/ProfileSchema'
import { getMasterListServer } from '@/services/Fivem'
import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/navigation'
import React, {
  Context,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

interface ProviderProps {
  serverToEdit: ServerProfileSchemaType
  serverDynamic: ServerDynamicSchemaType | null
  refreshServer: () => Promise<void>
}

const ServerEditCtx = createContext<ProviderProps | null>(null)

export const ServerEditorProvider: React.FC<{
  children: React.ReactNode
  server: ServerProfileSchemaType
}> = ({ children, server }) => {
  const utils = trpc.useContext()
  const router = useRouter()

  const [serverDynamic, setServerDynamic] =
    useState<ServerDynamicSchemaType | null>(null)
  const [serverToEdit, setServerToEdit] =
    useState<ServerProfileSchemaType>(server)

  const refreshServer = useCallback(async (): Promise<void> => {
    const serverProfile = await utils.servers.getServerProfile.fetch({
      joinId: server.joinId,
    })

    if (serverProfile) {
      setServerToEdit(serverProfile)
    }
  }, [server, utils.servers.getServerProfile])

  useEffect(() => {
    if (serverDynamic) return

    getMasterListServer(server.joinId).then((serverDynamic) => {
      if (!serverDynamic) return router.push('/home')

      setServerDynamic(serverDynamic)
    })
  }, [serverDynamic, router, server.joinId])

  return (
    <ServerEditCtx.Provider
      value={{
        serverToEdit,
        serverDynamic,
        refreshServer,
      }}
    >
      {children}
    </ServerEditCtx.Provider>
  )
}

export const useServerEditor = () =>
  useContext<ProviderProps>(ServerEditCtx as Context<ProviderProps>)
