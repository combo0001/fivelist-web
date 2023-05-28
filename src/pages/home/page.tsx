/* eslint-disable no-undef */
import { Header } from '@/components/Header'
import { Navigation } from '@/components/Navigation'

import { ListFilters } from './components/ListFilters'
import { ListHeader } from './components/ListHeader'
import { ListServers } from './components/ListServers'
import { FilterProvider } from './providers/FilterProvider'
import { ListContainer } from './style'
import { PageLayout } from '@/components/PageLayout'
import { useClientUser } from '@/providers/UserProvider'

export const HomePage = (): JSX.Element => {
  const { user } = useClientUser()

  const MOCK_SERVERS: ListType.Server[] = [
    {
      clients: 1200,
      slots: 2023,
      name: 'NARNIA ROLEPLAY >>>ABRIU AGORA<<< 🌈 SEM WL, ENTRE AGORA E GANHE UM VIP! #LOTUSGROUP',
      description: 'Venha jogar na cidade mais otimizada do FiveM',
      followers: 10,
      hasVip: true,
      likes: 12834,
      reviews: 12,
      cfxHash: 'pooa23',
    },
    {
      clients: 1200,
      slots: 2023,
      name: 'NARNIA ROLEPLAY >>>ABRIU AGORA<<< 🌈 SEM WL, ENTRE AGORA E GANHE UM VIP! #LOTUSGROUP',
      description: 'Venha jogar na cidade mais otimizada do FiveM',
      followers: 10,
      hasVip: false,
      likes: 12834,
      reviews: 12,
      cfxHash: 'pooa23',
    },
    {
      clients: 1200,
      slots: 2023,
      name: 'NARNIA ROLEPLAY >>>ABRIU AGORA<<< 🌈 SEM WL, ENTRE AGORA E GANHE UM VIP! #LOTUSGROUP',
      description: 'Venha jogar na cidade mais otimizada do FiveM',
      followers: 10,
      hasVip: true,
      likes: 12834,
      reviews: 12,
      cfxHash: 'pooa23',
    },
    {
      clients: 1200,
      slots: 2023,
      name: 'NARNIA ROLEPLAY >>>ABRIU AGORA<<< 🌈 SEM WL, ENTRE AGORA E GANHE UM VIP! #LOTUSGROUP',
      description: 'Venha jogar na cidade mais otimizada do FiveM',
      followers: 10,
      hasVip: true,
      likes: 12834,
      reviews: 12,
      cfxHash: 'pooa23',
    },
    {
      clients: 1200,
      slots: 2023,
      name: 'NARNIA ROLEPLAY >>>ABRIU AGORA<<< 🌈 SEM WL, ENTRE AGORA E GANHE UM VIP! #LOTUSGROUP',
      description: 'Venha jogar na cidade mais otimizada do FiveM',
      followers: 10,
      hasVip: false,
      likes: 12834,
      reviews: 12,
      cfxHash: 'pooa23',
    },
    {
      clients: 1200,
      slots: 2023,
      name: 'NARNIA ROLEPLAY >>>ABRIU AGORA<<< 🌈 SEM WL, ENTRE AGORA E GANHE UM VIP! #LOTUSGROUP',
      description: 'Venha jogar na cidade mais otimizada do FiveM',
      followers: 10,
      hasVip: false,
      likes: 12834,
      reviews: 12,
      cfxHash: 'pooa23',
    },
    {
      clients: 1200,
      slots: 2023,
      name: 'NARNIA ROLEPLAY >>>ABRIU AGORA<<< 🌈 SEM WL, ENTRE AGORA E GANHE UM VIP! #LOTUSGROUP',
      description: 'Venha jogar na cidade mais otimizada do FiveM',
      followers: 10,
      hasVip: false,
      likes: 12834,
      reviews: 12,
      cfxHash: 'pooa23',
    },
    {
      clients: 1200,
      slots: 2023,
      name: 'NARNIA ROLEPLAY >>>ABRIU AGORA<<< 🌈 SEM WL, ENTRE AGORA E GANHE UM VIP! #LOTUSGROUP',
      description: 'Venha jogar na cidade mais otimizada do FiveM',
      followers: 10,
      hasVip: true,
      likes: 12834,
      reviews: 12,
      cfxHash: 'pooa23',
    },
    {
      clients: 1200,
      slots: 2023,
      name: 'NARNIA ROLEPLAY >>>ABRIU AGORA<<< 🌈 SEM WL, ENTRE AGORA E GANHE UM VIP! #LOTUSGROUP',
      description: 'Venha jogar na cidade mais otimizada do FiveM',
      followers: 10,
      hasVip: false,
      likes: 12834,
      reviews: 12,
      cfxHash: 'pooa23',
    },
  ]

  return (
    <PageLayout>
      <Header user={user} />

      <Navigation />

      <ListContainer>
        <FilterProvider>
          <ListHeader />

          <ListFilters />

          <ListServers servers={MOCK_SERVERS} />
        </FilterProvider>
      </ListContainer>
    </PageLayout>
  )
}
