import { UserProvider } from '@/providers/UserProvider'
import { SignupMain } from './main'

// eslint-disable-next-line no-undef
export default function Signup(): JSX.Element {
  return (
    <UserProvider>
      <SignupMain />
    </UserProvider>
  )
}
