import { Header } from '@/components/Header'
import { getUser } from '@/services/users'
import { GetServerSideProps } from 'next'

import { HomeContainer } from './style'
import { Navigation } from '@/components/Navigation'
import { List } from './components/List'

export default function Home({ user }: any) {
  const MOCK_SERVERS: any = []

  return (
    <HomeContainer>
      <Header user={user} />

      <Navigation />

      <List servers={MOCK_SERVERS} />
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
