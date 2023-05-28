/* eslint-disable no-undef */
import { UserProvider } from '@/providers/UserProvider'
import { HomePage } from './page'

export default function Home(): JSX.Element {
  return (
    <UserProvider>
      <HomePage />
    </UserProvider>
  )
}
