/* eslint-disable no-undef */
import { Header } from '@/components/Header'
import { PageLayout } from '@/components/PageLayout'
import { useClientUser } from '@/providers/UserProvider'

export const CheckoutMain = (): JSX.Element => {
  const { user: clientUser } = useClientUser()

  return (
    <PageLayout>
      <Header user={clientUser} />
    </PageLayout>
  )
}
