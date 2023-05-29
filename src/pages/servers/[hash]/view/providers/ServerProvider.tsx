/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { Context, createContext, useContext, useState } from 'react'

const ServerCtx = createContext<ServersType.Provider | null>(null)

export const ServerProvider: React.FC<{
  children: React.ReactNode
  server: ServersType.ServerObject
}> = ({ children, server }) => {
  return <ServerCtx.Provider value={server}>{children}</ServerCtx.Provider>
}

export const useServer = () =>
  useContext<ServersType.Provider>(ServerCtx as Context<ServersType.Provider>)
