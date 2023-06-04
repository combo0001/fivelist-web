import { Header } from '@/components/Header'
import { Navigation } from '@/components/Navigation'
import { PageLayout } from '@/components/PageLayout'
import { useClientUser } from '@/providers/UserProvider'

import { ServerProvider } from '../providers/ServerProvider'
import { ServersProps } from './index.page'
import { ServerContainer } from './style'

// eslint-disable-next-line no-undef
export const ServersViewMain = ({ server }: ServersProps): JSX.Element => {
  const { user } = useClientUser()

  return (
    <PageLayout>
      <Header user={user} />

      <Navigation />

      <ServerContainer>
        <ServerProvider server={server}>
          <ServerContent />
        </ServerProvider>
      </ServerContainer>
    </PageLayout>
  )
}
