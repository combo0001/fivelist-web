/* eslint-disable no-undef */

import { UserProvider } from '@/providers/UserProvider'
import { GetStaticPaths, GetStaticProps } from 'next'

import { ServersViewMain } from './main'

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { hash: string }> = async ({
  params,
}) => {
  const hash = params?.hash as string
  const props = {
    server: {
      clients: 1200,
      slots: 2023,
      bannerURL:
        'https://cdn.discordapp.com/attachments/897332194811473951/1112740841988034600/Frame_1717.png',
      name: 'NARNIA ROLEPLAY >>>ABRIU AGORA<<< 🌈 SEM WL, ENTRE AGORA E GANHE UM VIP! #LOTUSGROUP',
      description: 'Venha jogar na cidade mais otimizada do FiveM',
      followers: 10,
      hasVip: true,
      likes: 12834,
      reviews: 12,
      cfxHash: hash,
      tags: {
        discord: '#',
        store: '#',
        website: '#',
      },
      endpoint: '127.0.0.1:30120',
    },
  }

  return {
    props,
    revalidate: 60,
  }
}

export interface ServersProps {
  server: ServersType.ServerObject
}

export default function ServersView({ server }: ServersProps): JSX.Element {
  return (
    <UserProvider>
      <ServersViewMain server={server} />
    </UserProvider>
  )
}
