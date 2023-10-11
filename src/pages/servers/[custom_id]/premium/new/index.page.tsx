/* eslint-disable no-undef */
import { useClientUser } from '@/providers/UserProvider'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useRouter as useNavigation } from 'next/navigation'
import { CheckoutMain } from './main'
import { trpc } from '@/utils/trpc'
import { PlansProvider } from '../providers/PlansProvider'

export default function Checkout(): JSX.Element {
  const router = useNavigation()

  const { query } = useRouter()
  const { user } = useClientUser()

  const { data: serverPage, isFetched } = trpc.servers.getServerProfile.useQuery({ joinId: query.custom_id as string })

  useEffect(() => {
    if (isFetched) {
      const page = (serverPage as any)?.page

      if (!page || !page.ownerUser || user?.id !== page.ownerUser.id) {
        router.push('/home')
      }
    }
    
    if (!query.plan || !query.offer) {
      router.push('/home')
    }
  })

  if (!isFetched) {
    return <></>
  }

  return (
    <PlansProvider>
      <CheckoutMain />
    </PlansProvider>
  )
}
