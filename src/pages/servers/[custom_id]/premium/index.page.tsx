/* eslint-disable no-undef */
import { UsersPremiumMain } from './main'
import { useClientUser } from '@/providers/UserProvider'
import { useEffect } from 'react'
import { useRouter as useNavigation } from 'next/navigation'
import { useRouter } from 'next/router'
import { PremiumProvider } from './providers/PremiumProvider'
import { PlansProvider } from './providers/PlansProvider'
import { ServerProfileSchemaType } from '@/schemas/servers/ProfileSchema'
import { trpc } from '@/utils/trpc'
import { LanguageProvider } from '@/providers/LanguageProvider'

export default function UsersPremium(): JSX.Element {
  const router = useNavigation()

  const { query } = useRouter()
  const { user } = useClientUser()

  const { data: serverPage, isFetched } =
    trpc.servers.getServerProfile.useQuery({
      joinId: query.custom_id as string,
    })

  useEffect(() => {
    if (isFetched) {
      const page = (serverPage as ServerProfileSchemaType | null)?.page

      if (!page || !page.ownerUser || user?.id !== page.ownerUser.id) {
        router.push('/home')
      }
    }
  })

  if (!serverPage) {
    return <></>
  }

  return (
    <LanguageProvider>
      <PlansProvider>
        <PremiumProvider server={serverPage}>
          <UsersPremiumMain />
        </PremiumProvider>
      </PlansProvider>
    </LanguageProvider>
  )
}
