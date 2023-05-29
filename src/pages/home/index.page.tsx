/* eslint-disable no-undef */
import { UserProvider } from '@/providers/UserProvider'

import { HomeMain } from './main'

export default function Home(): JSX.Element {
  return (
    <UserProvider>
      <HomeMain />
    </UserProvider>
  )
}
