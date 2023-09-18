/* eslint-disable no-undef */
import { Header } from '@/components/Header'
import { Navigation } from '@/components/Navigation'
import { PageLayout } from '@/components/PageLayout'
import { useClientUser } from '@/providers/UserProvider'
import { useRef } from 'react'

import { ListFilters } from './components/ListFilters'
import { ListHeader } from './components/ListHeader'
import { ListServers } from './components/ListServers'
import { FilterProvider } from './providers/FilterProvider'
import { ListContainer } from './style'

export const HomeMain = (): JSX.Element => {
  const { user } = useClientUser()
  const overflowComponent = useRef<HTMLDivElement>(null)

  return (
    <PageLayout>
      <Header user={user} />

      <Navigation user={user} />

      <ListContainer ref={overflowComponent}>
        <FilterProvider>
          <ListHeader />
          <ListFilters />
          <ListServers overflowComponent={overflowComponent} />
        </FilterProvider>
      </ListContainer>
    </PageLayout>
  )
}
