/* eslint-disable no-undef */
import { Header } from '@/components/Header'
import { Navigation } from '@/components/Navigation'
import { PageLayout } from '@/components/PageLayout'
import { useClientUser } from '@/providers/UserProvider'

import { ProfileHeader } from './components/ProfileHeader'
import { ProfileContent } from './components/ProfilerContent'
import { UsersContainer } from './style'
import { UserProfileSchemaType } from '@/@types/schemas/users/ProfileSchema'

interface UsersViewMainProps {
  user: UserProfileSchemaType
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
        <ProfileHeader user={profileUser} />

        <ProfileContent user={profileUser} />
      </UsersContainer>
    </PageLayout>
  )
}
