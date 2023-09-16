/* eslint-disable no-undef */
import { Header } from '@/components/Header'
import { Navigation } from '@/components/Navigation'
import { PageLayout } from '@/components/PageLayout'

import { ListFilters } from './components/ListFilters'
import { ListHeader } from './components/ListHeader'
import { ListServers } from './components/ListServers'
import { FilterProvider } from './providers/FilterProvider'
import { ListContainer } from './style'
import { useClientUser } from '@/providers/UserProvider'
import { useRef } from 'react'

export const HomeMain = (): JSX.Element => {
  const { user } = useClientUser()
  const overflowComponent = useRef<HTMLDivElement>(null)

  const MOCK_SERVERS: ServersType.ServerObject[] = [
    {
      clients: {
        now: 1200,
        onDay: 2562,
      },
      slots: 2023,
      name: 'NARNIA ROLEPLAY >>>ABRIU AGORA<<< 🌈 SEM WL, ENTRE AGORA E GANHE UM VIP! #LOTUSGROUP',
      description: 'Venha jogar na cidade mais otimizada do FiveM',
      followers: 10,
      hasVip: true,
      likes: 12834,
      reviews: 12,
      cfxHash: 'pooa23',
      bannerURL:
        'https://cdn.discordapp.com/attachments/923436122871308308/1119664784472805436/image.png',
      tags: {
        discord: '#',
        store: '#',
        website: '#',
      },
      endpoint: '127.0.0.1',
    },
    {
      clients: {
        now: 1200,
        onDay: 2562,
      },
      slots: 2023,
      name: 'NARNIA ROLEPLAY >>>ABRIU AGORA<<< 🌈 SEM WL, ENTRE AGORA E GANHE UM VIP! #LOTUSGROUP',
      description: 'Venha jogar na cidade mais otimizada do FiveM',
      followers: 10,
      hasVip: true,
      likes: 12834,
      reviews: 12,
      cfxHash: 'pooa23',
      bannerURL:
        'https://cdn.discordapp.com/attachments/923436122871308308/1119664784472805436/image.png',
      tags: {
        discord: '#',
        store: '#',
        website: '#',
      },
      endpoint: '127.0.0.1',
    },
    {
      clients: {
        now: 1200,
        onDay: 2562,
      },
      slots: 2023,
      name: 'NARNIA ROLEPLAY >>>ABRIU AGORA<<< 🌈 SEM WL, ENTRE AGORA E GANHE UM VIP! #LOTUSGROUP',
      description: 'Venha jogar na cidade mais otimizada do FiveM',
      followers: 10,
      hasVip: true,
      likes: 12834,
      reviews: 12,
      cfxHash: 'pooa23',
      bannerURL:
        'https://cdn.discordapp.com/attachments/923436122871308308/1119664784472805436/image.png',
      tags: {
        discord: '#',
        store: '#',
        website: '#',
      },
      endpoint: '127.0.0.1',
    },
    {
      clients: {
        now: 1200,
        onDay: 2562,
      },
      slots: 2023,
      name: 'NARNIA ROLEPLAY >>>ABRIU AGORA<<< 🌈 SEM WL, ENTRE AGORA E GANHE UM VIP! #LOTUSGROUP',
      description: 'Venha jogar na cidade mais otimizada do FiveM',
      followers: 10,
      hasVip: true,
      likes: 12834,
      reviews: 12,
      cfxHash: 'pooa23',
      bannerURL:
        'https://cdn.discordapp.com/attachments/923436122871308308/1119664784472805436/image.png',
      tags: {
        discord: '#',
        store: '#',
        website: '#',
      },
      endpoint: '127.0.0.1',
    },
    {
      clients: {
        now: 1200,
        onDay: 2562,
      },
      slots: 2023,
      name: 'NARNIA ROLEPLAY >>>ABRIU AGORA<<< 🌈 SEM WL, ENTRE AGORA E GANHE UM VIP! #LOTUSGROUP',
      description: 'Venha jogar na cidade mais otimizada do FiveM',
      followers: 10,
      hasVip: true,
      likes: 12834,
      reviews: 12,
      cfxHash: 'pooa23',
      bannerURL:
        'https://cdn.discordapp.com/attachments/923436122871308308/1119664784472805436/image.png',
      tags: {
        discord: '#',
        store: '#',
        website: '#',
      },
      endpoint: '127.0.0.1',
    },
    {
      clients: {
        now: 1200,
        onDay: 2562,
      },
      slots: 2023,
      name: 'NARNIA ROLEPLAY >>>ABRIU AGORA<<< 🌈 SEM WL, ENTRE AGORA E GANHE UM VIP! #LOTUSGROUP',
      description: 'Venha jogar na cidade mais otimizada do FiveM',
      followers: 10,
      hasVip: true,
      likes: 12834,
      reviews: 12,
      cfxHash: 'pooa23',
      bannerURL:
        'https://cdn.discordapp.com/attachments/923436122871308308/1119664784472805436/image.png',
      tags: {
        discord: '#',
        store: '#',
        website: '#',
      },
      endpoint: '127.0.0.1',
    },
    {
      clients: {
        now: 1200,
        onDay: 2562,
      },
      slots: 2023,
      name: 'NARNIA ROLEPLAY >>>ABRIU AGORA<<< 🌈 SEM WL, ENTRE AGORA E GANHE UM VIP! #LOTUSGROUP',
      description: 'Venha jogar na cidade mais otimizada do FiveM',
      followers: 10,
      hasVip: true,
      likes: 12834,
      reviews: 12,
      cfxHash: 'pooa23',
      bannerURL:
        'https://cdn.discordapp.com/attachments/923436122871308308/1119664784472805436/image.png',
      tags: {
        discord: '#',
        store: '#',
        website: '#',
      },
      endpoint: '127.0.0.1',
    },
    {
      clients: {
        now: 1200,
        onDay: 2562,
      },
      slots: 2023,
      name: 'NARNIA ROLEPLAY >>>ABRIU AGORA<<< 🌈 SEM WL, ENTRE AGORA E GANHE UM VIP! #LOTUSGROUP',
      description: 'Venha jogar na cidade mais otimizada do FiveM',
      followers: 10,
      hasVip: true,
      likes: 12834,
      reviews: 12,
      cfxHash: 'pooa23',
      bannerURL:
        'https://cdn.discordapp.com/attachments/923436122871308308/1119664784472805436/image.png',
      tags: {
        discord: '#',
        store: '#',
        website: '#',
      },
      endpoint: '127.0.0.1',
    },
    {
      clients: {
        now: 1200,
        onDay: 2562,
      },
      slots: 2023,
      name: 'NARNIA ROLEPLAY >>>ABRIU AGORA<<< 🌈 SEM WL, ENTRE AGORA E GANHE UM VIP! #LOTUSGROUP',
      description: 'Venha jogar na cidade mais otimizada do FiveM',
      followers: 10,
      hasVip: true,
      likes: 12834,
      reviews: 12,
      cfxHash: 'pooa23',
      bannerURL:
        'https://cdn.discordapp.com/attachments/923436122871308308/1119664784472805436/image.png',
      tags: {
        discord: '#',
        store: '#',
        website: '#',
      },
      endpoint: '127.0.0.1',
    },
    {
      clients: {
        now: 1200,
        onDay: 2562,
      },
      slots: 2023,
      name: 'NARNIA ROLEPLAY >>>ABRIU AGORA<<< 🌈 SEM WL, ENTRE AGORA E GANHE UM VIP! #LOTUSGROUP',
      description: 'Venha jogar na cidade mais otimizada do FiveM',
      followers: 10,
      hasVip: true,
      likes: 12834,
      reviews: 12,
      cfxHash: 'pooa23',
      bannerURL:
        'https://cdn.discordapp.com/attachments/923436122871308308/1119664784472805436/image.png',
      tags: {
        discord: '#',
        store: '#',
        website: '#',
      },
      endpoint: '127.0.0.1',
    },
    {
      clients: {
        now: 1200,
        onDay: 2562,
      },
      slots: 2023,
      name: 'NARNIA ROLEPLAY >>>ABRIU AGORA<<< 🌈 SEM WL, ENTRE AGORA E GANHE UM VIP! #LOTUSGROUP',
      description: 'Venha jogar na cidade mais otimizada do FiveM',
      followers: 10,
      hasVip: true,
      likes: 12834,
      reviews: 12,
      cfxHash: 'pooa23',
      bannerURL:
        'https://cdn.discordapp.com/attachments/923436122871308308/1119664784472805436/image.png',
      tags: {
        discord: '#',
        store: '#',
        website: '#',
      },
      endpoint: '127.0.0.1',
    },
    {
      clients: {
        now: 1200,
        onDay: 2562,
      },
      slots: 2023,
      name: 'NARNIA ROLEPLAY >>>ABRIU AGORA<<< 🌈 SEM WL, ENTRE AGORA E GANHE UM VIP! #LOTUSGROUP',
      description: 'Venha jogar na cidade mais otimizada do FiveM',
      followers: 10,
      hasVip: true,
      likes: 12834,
      reviews: 12,
      cfxHash: 'pooa23',
      bannerURL:
        'https://cdn.discordapp.com/attachments/923436122871308308/1119664784472805436/image.png',
      tags: {
        discord: '#',
        store: '#',
        website: '#',
      },
      endpoint: '127.0.0.1',
    },
    {
      clients: {
        now: 1200,
        onDay: 2562,
      },
      slots: 2023,
      name: 'NARNIA ROLEPLAY >>>ABRIU AGORA<<< 🌈 SEM WL, ENTRE AGORA E GANHE UM VIP! #LOTUSGROUP',
      description: 'Venha jogar na cidade mais otimizada do FiveM',
      followers: 10,
      hasVip: true,
      likes: 12834,
      reviews: 12,
      cfxHash: 'pooa23',
      bannerURL:
        'https://cdn.discordapp.com/attachments/923436122871308308/1119664784472805436/image.png',
      tags: {
        discord: '#',
        store: '#',
        website: '#',
      },
      endpoint: '127.0.0.1',
    },
    {
      clients: {
        now: 1200,
        onDay: 2562,
      },
      slots: 2023,
      name: 'NARNIA ROLEPLAY >>>ABRIU AGORA<<< 🌈 SEM WL, ENTRE AGORA E GANHE UM VIP! #LOTUSGROUP',
      description: 'Venha jogar na cidade mais otimizada do FiveM',
      followers: 10,
      hasVip: true,
      likes: 12834,
      reviews: 12,
      cfxHash: 'pooa23',
      bannerURL:
        'https://cdn.discordapp.com/attachments/923436122871308308/1119664784472805436/image.png',
      tags: {
        discord: '#',
        store: '#',
        website: '#',
      },
      endpoint: '127.0.0.1',
    },
    {
      clients: {
        now: 1200,
        onDay: 2562,
      },
      slots: 2023,
      name: 'NARNIA ROLEPLAY >>>ABRIU AGORA<<< 🌈 SEM WL, ENTRE AGORA E GANHE UM VIP! #LOTUSGROUP',
      description: 'Venha jogar na cidade mais otimizada do FiveM',
      followers: 10,
      hasVip: true,
      likes: 12834,
      reviews: 12,
      cfxHash: 'pooa23',
      bannerURL:
        'https://cdn.discordapp.com/attachments/923436122871308308/1119664784472805436/image.png',
      tags: {
        discord: '#',
        store: '#',
        website: '#',
      },
      endpoint: '127.0.0.1',
    },
    {
      clients: {
        now: 1200,
        onDay: 2562,
      },
      slots: 2023,
      name: 'NARNIA ROLEPLAY >>>ABRIU AGORA<<< 🌈 SEM WL, ENTRE AGORA E GANHE UM VIP! #LOTUSGROUP',
      description: 'Venha jogar na cidade mais otimizada do FiveM',
      followers: 10,
      hasVip: true,
      likes: 12834,
      reviews: 12,
      cfxHash: 'pooa23',
      bannerURL:
        'https://cdn.discordapp.com/attachments/923436122871308308/1119664784472805436/image.png',
      tags: {
        discord: '#',
        store: '#',
        website: '#',
      },
      endpoint: '127.0.0.1',
    },
    {
      clients: {
        now: 1200,
        onDay: 2562,
      },
      slots: 2023,
      name: 'NARNIA ROLEPLAY >>>ABRIU AGORA<<< 🌈 SEM WL, ENTRE AGORA E GANHE UM VIP! #LOTUSGROUP',
      description: 'Venha jogar na cidade mais otimizada do FiveM',
      followers: 10,
      hasVip: true,
      likes: 12834,
      reviews: 12,
      cfxHash: 'pooa23',
      bannerURL:
        'https://cdn.discordapp.com/attachments/923436122871308308/1119664784472805436/image.png',
      tags: {
        discord: '#',
        store: '#',
        website: '#',
      },
      endpoint: '127.0.0.1',
    },
  ]

  return (
    <PageLayout>
      <Header user={user} />

      <Navigation user={user} />

      <ListContainer ref={overflowComponent}>
        <FilterProvider>
          <ListHeader />
          <ListFilters />
          <ListServers overflowComponent={overflowComponent.current} />
        </FilterProvider>
      </ListContainer>
    </PageLayout>
  )
}
