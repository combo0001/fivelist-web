import { Header } from '@/components/Header'
import { Navigation } from '@/components/Navigation'
import { PageLayout } from '@/components/PageLayout'

import { ServerProvider } from '../providers/ServerProvider'
import { ServerContent } from './components/ServerContent'
import { ServersProps } from './index.page'
import { ServerContainer } from './style'
import { useClientUser } from '@/providers/UserProvider'

// eslint-disable-next-line no-undef
export const ServersViewMain = ({ server }: ServersProps): JSX.Element => {
  const { user } = useClientUser()

  return (
    <PageLayout>
      <Header user={user} />

      <Navigation user={user} />

      <ServerContainer>
        <ServerProvider server={server}>
          <ServerContent />
        </ServerProvider>
      </ServerContainer>
    </PageLayout>
  )
}
