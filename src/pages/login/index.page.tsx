import { UserProvider } from '@/providers/UserProvider'

import { LoginMain } from './main'

// eslint-disable-next-line no-undef
export default function Login(): JSX.Element {
  return (
    <UserProvider>
      <LoginMain />
    </UserProvider>
  )
}
