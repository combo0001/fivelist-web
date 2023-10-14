/* eslint-disable no-undef */
import { Header } from '@/components/Header'
import { Navigation } from '@/components/Navigation'
import { PageLayout } from '@/components/PageLayout'
import { useClientUser } from '@/providers/UserProvider'

import { ProfileHeader } from './components/ProfileHeader'
import { ProfileContent } from './components/ProfilerContent'
import { UsersContainer } from './style'
import { useEffect, useRef } from 'react'
import { useUserView } from './providers/UserViewProvider'

export const UsersViewMain = (): JSX.Element => {
  const { user: clientUser } = useClientUser()
  const { registerViewToUser } = useUserView()

  const viewStatus = useRef<boolean>(false)

  useEffect(() => {
    if (viewStatus.current) return

    registerViewToUser()
    viewStatus.current = true
  }, [registerViewToUser])

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
