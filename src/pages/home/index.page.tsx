import { Header } from '@/components/Users'
import { getUser } from '@/services/users'
import { GetServerSideProps } from 'next'

export default function Home({ user }: any) {
  return <Header user={user}></Header>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const user: any = await getUser(ctx)

  return {
    props: {
      user,
    },
  }
}
