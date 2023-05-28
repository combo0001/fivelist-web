/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { Context, createContext, useContext, useState } from 'react'

const FilterCtx = createContext<FilterType.Provider | null>(null)

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [serverName, setServerName] = useState<string>('')
  const [playerName, setPlayerName] = useState<string>('')
  const [serverLocation, setServerLocation] = useState<string>('')
  const [orderBy, setOrderBy] = useState<FilterType.OrderServers>('likes')

  return (
    <FilterCtx.Provider
      value={{
        serverName,
        playerName,
        serverLocation,
        orderBy,
        setServerName,
        setPlayerName,
        setServerLocation,
        setOrderBy,
      }}
    >
      {children}
    </FilterCtx.Provider>
  )
}

export const useFilter = () =>
  useContext<FilterType.Provider>(FilterCtx as Context<FilterType.Provider>)
