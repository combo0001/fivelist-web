/* eslint-disable no-undef */
import { Header } from '@/components/Header'
import { PageLayout } from '@/components/PageLayout'
import { useClientUser } from '@/providers/UserProvider'
import { CheckoutWrapper } from './style'
import { Heading } from '@5list-design-system/react'
import { useRouter } from 'next/navigation'
import { Payment } from './components/Payment'
import { Summary } from './components/Summary'
import { useEffect, useState } from 'react'

export const CheckoutMain = (): JSX.Element => {
  const router = useRouter()
  const { user: clientUser } = useClientUser()

  const [isBacking, setBacking] = useState<boolean>(false)

  const handleOnBack = () => {
    if (isBacking) return

    setBacking(true)
  }

  useEffect(() => {
    if (isBacking) {
      router.back()
    }
  }, [isBacking, router])

  return (
    <PageLayout>
      <Header user={clientUser} />

      <CheckoutWrapper>
        <Heading
          as={'h5'}
          css={{
            gridArea: '1 / 3 / 1 / 1',
            cursor: 'pointer',
            userSelect: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
          weight={'bold'}
          onClick={handleOnBack}
        >
          Voltar
        </Heading>

        <Summary />
        <Payment />
      </CheckoutWrapper>
    </PageLayout>
  )
}
