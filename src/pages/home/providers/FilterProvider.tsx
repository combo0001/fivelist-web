/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, {
  Context,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { countries } from 'countries-list'
import { useTranslation } from 'react-i18next'

type OptionsProps = { label: string; value: string }

export enum OrderValueEnum {
  Likes = 'LIKES',
  Followers = 'FOLLOWERS',
  Players = 'PLAYERS',
}

type SelectOptionsType = { label: string; value: OrderValueEnum }[]

interface FilterProviderProps {
  serverName: string
  serverLocation: string
  orderBy: OrderValueEnum
  orderOptions: SelectOptionsType
  setServerName: (value: string) => void
  setServerLocation: (value: string) => void
  setOrderBy: (value: OrderValueEnum) => void
  getCountries: () => OptionsProps[]
}

const FilterCtx = createContext<FilterProviderProps | null>(null)

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { t, i18n } = useTranslation('pages')

  const [serverName, setServerName] = useState<string>('')
  const [serverLocation, setServerLocation] = useState<string>('')

  const [orderBy, setOrderBy] = useState<OrderValueEnum>(OrderValueEnum.Likes)
  const [orderOptions, setOrderOptions] = useState<SelectOptionsType>([])

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

  useEffect(() => {
    setOrderOptions([
      {
        label: t('home.filterInputs.orderByOptions.mostVoted'),
        value: OrderValueEnum.Likes,
      },
      {
        label: t('home.filterInputs.orderByOptions.mostFollowers'),
        value: OrderValueEnum.Followers,
      },
      {
        label: t('home.filterInputs.orderByOptions.mostPlayers'),
        value: OrderValueEnum.Players,
      },
    ])
  }, [i18n.resolvedLanguage])

  return (
    <FilterCtx.Provider
      value={{
        serverName,
        serverLocation,
        setServerName,
        setServerLocation,
        getCountries,
        orderBy,
        orderOptions,
        setOrderBy,
      }}
    >
      {children}
    </FilterCtx.Provider>
  )
}

export const useFilter = () =>
  useContext<FilterProviderProps>(FilterCtx as Context<FilterProviderProps>)
