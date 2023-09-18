/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { Context, createContext, useContext, useState } from 'react'
import { countries } from 'countries-list'

type OptionsProps = { label: string, value: string }

export enum OrderValueEnum {
  Likes = 'LIKES',
  Followers = 'FOLLOWERS',
  Players = 'PLAYERS',
}

interface FilterProviderProps {
  serverName: string
  serverLocation: string
  orderBy: OrderValueEnum 
  setServerName: (value: string) => void
  setServerLocation: (value: string) => void
  setOrderBy: (value: OrderValueEnum) => void
  getCountries: () => OptionsProps[]
  getOrders: () => OptionsProps[]
}

const FilterCtx = createContext<FilterProviderProps | null>(null)

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [serverName, setServerName] = useState<string>('')
  const [serverLocation, setServerLocation] = useState<string>('')
  const [orderBy, setOrderBy] = useState<OrderValueEnum>(OrderValueEnum.Likes)

  const getCountries = (): OptionsProps[] => {
    const countriesList = Object.entries(countries)
      .map(([code, country]) => {
        return {
          label: code === 'BR' ? 'Brasil' : country.name,
          value: code,
        }
      })
      .sort((a, b) => a.label.localeCompare(b.label))

    return countriesList
  }

  const getOrders = (): { label: string, value: OrderValueEnum }[] => {
    return [
      { label: 'Mais votados', value: OrderValueEnum.Likes },
      { label: 'Mais seguidos', value: OrderValueEnum.Followers },
      { label: 'Mais jogadores', value: OrderValueEnum.Players },
    ]
  }

  return (
    <FilterCtx.Provider
      value={{
        serverName,
        serverLocation,
        orderBy,
        setServerName,
        setServerLocation,
        setOrderBy,
        getCountries,
        getOrders,
      }}
    >
      {children}
    </FilterCtx.Provider>
  )
}

export const useFilter = () =>
  useContext<FilterProviderProps>(FilterCtx as Context<FilterProviderProps>)
