import type { AppType } from 'next/app'
import { trpc } from '../utils/trpc'
import { globalStyles } from '@/styles/global'
import { UserProvider } from '@/providers/UserProvider'

globalStyles()

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default trpc.withTRPC(MyApp)
