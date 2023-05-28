/* eslint-disable no-undef */

import { UserProvider } from '@/providers/UserProvider'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ServersPage } from './page'

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { hash: string }> = async ({
  params,
}) => {
  const hash = params?.hash
  let props = {}

  if (hash) {
    props = {
      server: {
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
    }
  }

  return {
    props,
    revalidate: 60,
  }
}

export interface ServersProps {
  server?: ListType.Server
}

export default function Servers({ server }: ServersProps): JSX.Element {
  return (
    <UserProvider>
      <ServersPage server={server} />
    </UserProvider>
  )
}
