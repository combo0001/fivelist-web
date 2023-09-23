import { ServerProfileSchemaType } from '@/schemas/servers/ProfileSchema'
import React, { Context, createContext, useCallback, useContext, useState } from 'react'

interface ProviderProps {
  server: ServerProfileSchemaType
}

const ServerViewCtx = createContext<ProviderProps | null>(null)

export const ServerViewProvider: React.FC<{
  children: React.ReactNode
  server: ServerProfileSchemaType
}> = ({ children, server }) => {
  const [serverToView, setServerToView] = useState(server)

  return (
    <ServerViewCtx.Provider value={{ 
      server: serverToView, 
    }}>
      {children}
    </ServerViewCtx.Provider>
  )
}

export const useServerView = () =>
  useContext<ProviderProps>(ServerViewCtx as Context<ProviderProps>)
