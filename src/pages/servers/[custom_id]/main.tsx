import { Header } from '@/components/Header'
import { Navigation } from '@/components/Navigation'
import { PageLayout } from '@/components/PageLayout'
import { ServerContent } from './components/ServerContent'
import { ServerHeader } from './components/ServerHeader'
import { ServerContainer } from './style'
import { useClientUser } from '@/providers/UserProvider'
import { useServerView } from './providers/ServerViewProvider'

// eslint-disable-next-line no-undef
export const ServersViewMain = (): JSX.Element => {
  const { user } = useClientUser()
  const { serverDynamic } = useServerView()

  if (!serverDynamic) {
    return <></>
  }

  return (
    <PageLayout>
      <Header user={user} />

      <Navigation user={user} />

      <ServerContainer>
        <ServerHeader />

        <ServerContent />
      </ServerContainer>
    </PageLayout>
  )
}
