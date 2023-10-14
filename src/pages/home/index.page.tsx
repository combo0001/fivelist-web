/* eslint-disable no-undef */
import { InferGetStaticPropsType } from 'next'
import { HomeMain } from './main'
import { ServersListProvider } from './providers/ServersListProvider'
import { getServerHelper } from '@/utils/getServerHelper'

export const getStaticProps = async () => {
  const helpers = await getServerHelper()

  const servers = await helpers.servers.getServerList.fetch()
  const props = {
    servers,
  }

  return {
    props,
    revalidate: 300,
  }
}

export default function UsersView({
  servers,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  if (!servers) {
    return <></>
  }

  return (
    <ServersListProvider servers={servers} newServers={[]}>
      <HomeMain />
    </ServersListProvider>
  )
}
