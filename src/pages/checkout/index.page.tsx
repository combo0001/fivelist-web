/* eslint-disable no-undef */
import { useClientUser } from '@/providers/UserProvider'
import { useRouter } from 'next/router'
import { CheckoutMain } from './main'
import { CheckoutProvider } from './providers/CheckoutProvider'
import { LanguageProvider } from '@/providers/LanguageProvider'

export default function Checkout(): JSX.Element {
  const { user } = useClientUser()
  const { query } = useRouter()

  const orderId = query.order as string | undefined

  return (
    <LanguageProvider>
      <CheckoutProvider user={user} order={orderId}>
        <CheckoutMain />
      </CheckoutProvider>
    </LanguageProvider>
  )
}
