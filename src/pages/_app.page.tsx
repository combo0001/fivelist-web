import type { AppType } from 'next/app'
import { trpc } from '../utils/trpc'
import { globalStyles } from '@/styles/global'
import { UserProvider } from '@/providers/UserProvider'
import { StorageProvider } from '@/providers/StorageProvider'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { NextComponentType } from 'next'
import { ni18nConfig } from '../../ni18n.config'
import { appWithI18Next } from 'ni18n'
import { LanguageProvider, useLanguage } from '@/providers/LanguageProvider'

globalStyles()

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <StorageProvider>
        <Component {...pageProps} />

        <ToastContainer
          theme={'dark'}
          position={'bottom-right'}
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </StorageProvider>
    </UserProvider>
  )
}

const MyAppWithI18n = appWithI18Next(MyApp, ni18nConfig as any)

export default trpc.withTRPC(MyAppWithI18n as NextComponentType)
