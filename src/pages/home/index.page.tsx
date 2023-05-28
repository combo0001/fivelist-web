/* eslint-disable no-undef */
import { Header } from '@/components/Header'
import { Navigation } from '@/components/Navigation'
import { getUser } from '@/services/users'
import { GetServerSideProps } from 'next'

import { ListFilters } from './components/ListFilters'
import { ListHeader } from './components/ListHeader'
import { FilterProvider } from './providers/FilterProvider'
import { HomeContainer, ListContainer } from './style'
import { ListServers } from './components/ListServers'

export default function Home({ user }: any) {
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
    <HomeContainer>
      <Header user={user} />

      <Navigation />

      <ListContainer>
        <FilterProvider>
          <ListHeader />

          <ListFilters />

          <ListServers servers={MOCK_SERVERS} />
        </FilterProvider>
      </ListContainer>
    </HomeContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const user: any = await getUser(ctx)

  return {
    props: {
      user: user || null,
    },
  }
}
