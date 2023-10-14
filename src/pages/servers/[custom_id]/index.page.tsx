/* eslint-disable no-undef */

import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'

import { ServersViewMain } from './main'
import { getServerHelper } from '@/utils/getServerHelper'
import { ServerViewProvider } from './providers/ServerViewProvider'

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ custom_id: string }>) => {
  const helpers = await getServerHelper()
  const customId = params?.custom_id

  if (typeof customId === 'string' && customId.length === 6) {
    const serverPage = await helpers.servers.getServerProfile.fetch({
      joinId: customId,
    })

    if (serverPage) {
      const props = {
        serverPage,
      }

      return {
        props,
        revalidate: 60,
      }
    }
  }

  return {
    redirect: {
      destination: '/home',
      permanent: false,
    },
  }
}

export default function ServersView({
  serverPage,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  if (!serverPage) {
    return <></>
  }

  return (
    <ServerViewProvider server={serverPage}>
      <ServersViewMain />
    </ServerViewProvider>
  )
}
