import { LanguageProvider } from '@/providers/LanguageProvider'
import { SignUpMain } from './main'

// eslint-disable-next-line no-undef
export default function SignUp(): JSX.Element {
  return (
    <LanguageProvider>
      <SignUpMain />
    </LanguageProvider>
  )
}
