import { UserProvider } from '@/providers/UserProvider'

import { SigninMain } from './main'

// eslint-disable-next-line no-undef
export default function Signin(): JSX.Element {
  return (
    <UserProvider>
      <SigninMain />
    </UserProvider>
  )
}
