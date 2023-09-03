import type { AppType } from 'next/app'
import { trpc } from '../utils/trpc'
import { globalStyles } from '@/styles/global'
import { UserProvider } from '@/providers/UserProvider'
import { StorageProvider } from '@/providers/StorageProvider'

globalStyles()

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <StorageProvider>
        <Component {...pageProps} />
      </StorageProvider>
    </UserProvider>
  )
}

export default trpc.withTRPC(MyApp)
