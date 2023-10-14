import type { AppType } from 'next/app'
import { trpc } from '../utils/trpc'
import { globalStyles } from '@/styles/global'
import { UserProvider } from '@/providers/UserProvider'
import { StorageProvider } from '@/providers/StorageProvider'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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

export default trpc.withTRPC(MyApp)
