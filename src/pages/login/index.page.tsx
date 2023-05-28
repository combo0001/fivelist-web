import { UserProvider } from '@/providers/UserProvider'
import { LoginPage } from './page'

// eslint-disable-next-line no-undef
export default function Login(): JSX.Element {
  return (
    <UserProvider>
      <LoginPage />
    </UserProvider>
  )
}
