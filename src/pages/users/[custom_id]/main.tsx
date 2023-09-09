/* eslint-disable no-undef */
import { Header } from '@/components/Header'
import { Navigation } from '@/components/Navigation'
import { PageLayout } from '@/components/PageLayout'
import { UserProfileSchemaType } from '@/schemas/users/ProfileSchema'
import { useClientUser } from '@/providers/UserProvider'

import { ProfileHeader } from './components/ProfileHeader'
import { ProfileContent } from './components/ProfilerContent'
import { UsersContainer } from './style'

interface UsersViewMainProps {}

export const UsersViewMain = ({}: UsersViewMainProps): JSX.Element => {
  const { user: clientUser } = useClientUser()

  return (
    <PageLayout>
      <Header user={clientUser} />

      <Navigation user={clientUser} />

      <UsersContainer>
        <ProfileHeader />

        <ProfileContent />
      </UsersContainer>
    </PageLayout>
  )
}
