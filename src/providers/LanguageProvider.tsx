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

import exampleLanguage from '../../public/language/pt-BR.json'

type AvailableLanguagesType = { id: string, name: string }[]
interface ProviderProps {
  availableLanguages: AvailableLanguagesType
  language: typeof exampleLanguage
  changeLanguage: (id: string) => Promise<void>
}

const LANGUAGES_IDS = [
  'pt-BR',
  'en-US',
  'es-ES',
]

const getLanguage = async (id: string): Promise<typeof exampleLanguage> => {
  const languageResponse = await fetch(`/language/${id}.json`)
  const language = await languageResponse.json()

  return language
}

const LanguageCtx = createContext<ProviderProps | null>(null)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [availableLanguages, setAvailableLanguages] = useState<AvailableLanguagesType | null>(null)
  const [language, setLanguage] = useState<typeof exampleLanguage>(exampleLanguage)

  const changeLanguage = useCallback(
    async (id: string): Promise<void> => {
      localStorage.setItem('language', id)

      if (language._config.id === id) return

      try {
        const language = await getLanguage(id)

        setLanguage(language)
      } catch (error) {}
    },
    [ getLanguage, setLanguage ],
  )

  useEffect(() => {
    if (availableLanguages) return 

    const timeoutId = setTimeout(async () => {
      const availableLanguages: AvailableLanguagesType = [] 

      for (const id of LANGUAGES_IDS) {
        try {
          const language = await getLanguage(id)
  
          availableLanguages.push({
            id: language._config.id,
            name: language._config.name,
          })
        } catch (err) {}
      }

      setAvailableLanguages(availableLanguages)
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [ availableLanguages ])

  useEffect(() => {
    const languageId = localStorage.getItem('language')

    if (!languageId) return

    changeLanguage(languageId)
  }, [ ])

  return (
    <LanguageCtx.Provider
      value={{
        availableLanguages: availableLanguages || [],
        language,
        changeLanguage
      }}
    >
      {children}
    </LanguageCtx.Provider>
  )
}

export const useLanguage = () =>
  useContext<ProviderProps>(LanguageCtx as Context<ProviderProps>)
