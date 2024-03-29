import { LanguageProvider } from '@/providers/LanguageProvider'
import { ResetPasswordMain } from './main'

// eslint-disable-next-line no-undef
export default function ResetPassword(): JSX.Element {
  return (
    <LanguageProvider>
      <ResetPasswordMain />
    </LanguageProvider>
  )
}
