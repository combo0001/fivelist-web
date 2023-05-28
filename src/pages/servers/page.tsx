/* eslint-disable no-undef */
import { Header } from '@/components/Header'
import { Navigation } from '@/components/Navigation'
import { PageLayout } from '@/components/PageLayout'
import { useClientUser } from '@/providers/UserProvider'
import { ServersProps } from './[hash].page'
import { ServerContainer } from './style'
import { ServerHeader } from './components/ServerHeader'

export const ServersPage = ({ server }: ServersProps): JSX.Element => {
  const { user } = useClientUser()

  console.log(server)

  return (
    <PageLayout>
      <Header user={user} />

      <Navigation />

      <ServerContainer>
        <ServerHeader />
      </ServerContainer>
    </PageLayout>
  )
}
