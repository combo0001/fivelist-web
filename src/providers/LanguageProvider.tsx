/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, {
  Context,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'

interface ProviderProps {
  changeLanguage: (language: string) => void
}

const LanguageCtx = createContext<ProviderProps | null>(null)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { i18n } = useTranslation()

  const [ready, setReady] = useState<boolean>(false)

  const changeLanguage = (language: string): void => {
    i18n.changeLanguage(language)

    if (typeof window !== 'undefined') {
      localStorage.setItem('fivelist-language', language)
    }
  }

  useEffect(() => {
    i18n.on('loaded', () => {
      const language = localStorage.getItem('fivelist-language')

      if (language && language !== i18n.resolvedLanguage) {
        changeLanguage(language)
      }
    })

    i18n.on('languageChanged', () => {
      if (!ready) setReady(true)
    })

    return () => {
      i18n.off('loaded')
      i18n.off('languageChanged')
    }
  }, [i18n])

  return (
    <LanguageCtx.Provider value={{ changeLanguage }}>
      {ready && children}
    </LanguageCtx.Provider>
  )
}

export const useLanguage = () =>
  useContext<ProviderProps>(LanguageCtx as Context<ProviderProps>)
