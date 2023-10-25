import { LanguageProvider } from '@/providers/LanguageProvider'
import { SignInMain } from './main'

// eslint-disable-next-line no-undef
export default function SignIn(): JSX.Element {
  return (
    <LanguageProvider>
      <SignInMain />
    </LanguageProvider>
  )
}
