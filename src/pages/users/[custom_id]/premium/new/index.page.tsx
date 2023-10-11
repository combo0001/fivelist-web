/* eslint-disable no-undef */
import { useClientUser } from '@/providers/UserProvider'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useRouter as useNavigation } from 'next/navigation'
import { CheckoutMain } from './main'
import { trpc } from '@/utils/trpc'
import { PlansProvider } from '../providers/PlansProvider'
import { UserProfileSchemaType } from '@/schemas/users/ProfileSchema'

export default function Checkout(): JSX.Element {
  const router = useNavigation()

  const { query } = useRouter()
  const { user } = useClientUser()

  const { data: userPage, isFetched } = trpc.users.getUserProfile.useQuery({ customId: query.custom_id as string })

  useEffect(() => {
    if (isFetched) {
      const page = (userPage as UserProfileSchemaType | null)

      if (!page || user?.id !== page.id) {
        router.push('/home')
      }
    }
    
    if (!query.plan || !query.offer) {
      router.push('/home')
    }
  })

  if (!userPage) {
    return <></>
  }

  return (
    <PlansProvider>
      <CheckoutMain />
    </PlansProvider>
  )
}
