import { ServerDynamicSchemaType } from '@/schemas/servers/DynamicSchema'
import { ServerProfileSchemaType } from '@/schemas/servers/ProfileSchema'
import { getMasterListServer } from '@/services/Fivem'
import { useRouter } from 'next/navigation'
import React, { Context, createContext, useCallback, useContext, useEffect, useState } from 'react'

interface ProviderProps {
  serverView: ServerProfileSchemaType
  serverDynamic: ServerDynamicSchemaType | null
}

const ServerViewCtx = createContext<ProviderProps | null>(null)

export const ServerViewProvider: React.FC<{
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
    <ServerViewCtx.Provider value={{ 
      serverView: server,
      serverDynamic
    }}>
      {children}
    </ServerViewCtx.Provider>
  )
}

export const useServerView = () =>
  useContext<ProviderProps>(ServerViewCtx as Context<ProviderProps>)
