import { ServerDynamicSchemaType } from '@/schemas/servers/DynamicSchema'
import { ServerProfileSchemaType } from '@/schemas/servers/ProfileSchema'
import { getMasterListServer } from '@/services/Fivem'
import { useRouter } from 'next/navigation'
import React, { Context, createContext, useCallback, useContext, useEffect, useState } from 'react'

interface ProviderProps {
  serverToEdit: ServerProfileSchemaType
  serverDynamic: ServerDynamicSchemaType | null
}

const ServerEditCtx = createContext<ProviderProps | null>(null)

export const ServerEditProvider: React.FC<{
  children: React.ReactNode
  server: ServerProfileSchemaType
}> = ({ children, server }) => {
  const [serverDynamic, setServerDynamic] = useState<ServerDynamicSchemaType | null>(null)
  const router = useRouter()
  
  useEffect(() => {
    if (serverDynamic) return

    getMasterListServer(server.joinId)
      .then((serverDynamic) => {
        if (!serverDynamic) return router.push('/home')

        setServerDynamic(serverDynamic)
      })
  }, [ serverDynamic ])

  return (
    <ServerEditCtx.Provider value={{ 
      serverToEdit: server,
      serverDynamic
    }}>
      {children}
    </ServerEditCtx.Provider>
  )
}

export const useServerEdit = () =>
  useContext<ProviderProps>(ServerEditCtx as Context<ProviderProps>)
