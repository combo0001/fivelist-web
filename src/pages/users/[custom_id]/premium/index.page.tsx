/* eslint-disable no-undef */
import { UsersPremiumMain } from './main'
import { useClientUser } from '@/providers/UserProvider'
import { useEffect } from 'react'
import { PremiumProvider } from './providers/PremiumProvider'
import { PlansProvider } from './providers/PlansProvider'
import { UserProfileSchemaType } from '@/schemas/users/ProfileSchema'
import { useRouter } from 'next/router'
import { useRouter as useNavigation } from 'next/navigation'
import { trpc } from '@/utils/trpc'
import { LanguageProvider } from '@/providers/LanguageProvider'

export default function UsersPremium(): JSX.Element {
  const router = useNavigation()

  const { user } = useClientUser()
  const { query } = useRouter()

  const { data: userPage, isFetched } = trpc.users.getUserProfile.useQuery({
    customId: query.custom_id as string,
  })

  useEffect(() => {
    if (isFetched) {
      const page = userPage as UserProfileSchemaType | null

      if (!page || user?.id !== page.id) {
        router.push('/home')
      }
    }
  })

  if (!userPage) {
    return <></>
  }

  return (
    <LanguageProvider>
      <PlansProvider>
        <PremiumProvider user={userPage}>
          <UsersPremiumMain />
        </PremiumProvider>
      </PlansProvider>
    </LanguageProvider>
  )
}
