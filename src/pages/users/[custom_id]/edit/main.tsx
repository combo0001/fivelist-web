/* eslint-disable no-undef */
import { Header } from '@/components/Header'
import { Navigation } from '@/components/Navigation'
import { PageLayout } from '@/components/PageLayout'
import { UserSchemaType } from '@/@types/schemas/UserIdentitySchema'
import { useClientUser } from '@/providers/UserProvider'

import { ProfileProvider } from '../providers/ProfileProvider'
import { ProfileHeader } from './components/ProfileHeader'
import { ProfileContent } from './components/ProfilerContent'
import { UsersContainer } from './style'

interface UsersViewMainProps {
  user: UserSchemaType
}

export const UsersViewMain = ({
  user: profileUser,
}: UsersViewMainProps): JSX.Element => {
  const { user: clientUser } = useClientUser()

  return (
    <PageLayout>
      <Header user={clientUser} />

      <Navigation user={clientUser} />

      <UsersContainer>
        <ProfileProvider user={profileUser}>
          <ProfileHeader />

          <ProfileContent />
        </ProfileProvider>
      </UsersContainer>
    </PageLayout>
  )
}
