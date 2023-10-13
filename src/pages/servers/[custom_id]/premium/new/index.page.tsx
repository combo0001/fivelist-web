/* eslint-disable no-undef */
import { useClientUser } from '@/providers/UserProvider'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useRouter as useNavigation } from 'next/navigation'
import { CheckoutMain } from './main'
import { trpc } from '@/utils/trpc'
import { PaymentProvider } from './providers/PaymentProvider'
import { OfferEnumSchema, OfferEnumSchemaType } from '@/schemas/PremiumSchema'

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
    
    try {
      const isValidOffer = OfferEnumSchema.parse(query.offer)

      if (!query.plan || !isValidOffer) {
        throw new Error()
      }
    } catch (error) {
      router.push('/home')
    }
  })

  if (!isFetched) {
    return <></>
  }

  return (
    <PaymentProvider
      plan={query.plan as string}
      offer={query.offer as OfferEnumSchemaType}
    >
      <CheckoutMain />
    </PaymentProvider>
  )
}
