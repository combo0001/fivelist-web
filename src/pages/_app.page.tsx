import type { AppType } from 'next/app'
import { trpc } from '../utils/trpc'
import { globalStyles } from '@/styles/global'

globalStyles()

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default trpc.withTRPC(MyApp)
