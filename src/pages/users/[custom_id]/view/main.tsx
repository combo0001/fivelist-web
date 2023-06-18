/* eslint-disable no-undef */
import { Header } from '@/components/Header'
import { Navigation } from '@/components/Navigation'
import { PageLayout } from '@/components/PageLayout'
import { useClientUser } from '@/providers/UserProvider'

import { UsersProps } from './index.page'
import { UsersContainer } from './style'

export const UsersViewMain = ({
  user: profileUser,
}: UsersProps): JSX.Element => {
  const { user: clientUser } = useClientUser()

  return (
    <PageLayout>
      <Header user={clientUser} />

      <Navigation user={clientUser} />

      <UsersContainer></UsersContainer>
    </PageLayout>
  )
}
