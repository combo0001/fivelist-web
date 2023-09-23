/* eslint-disable no-undef */

import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next'

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
  const customId = params?.custom_id as string

  const serverPage = await helpers.servers.getServerProfile.fetch({ joinId: customId })

  if (serverPage) {
    const props = {
      serverPage,
    }

    return {
      props,
      revalidate: 300,
    }
  } else {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    }
  }
}

export default function ServersView({ serverPage }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  if (!serverPage) {
    return <></>
  }

  return (
    <ServerViewProvider server={serverPage}>
      <ServersViewMain />
    </ServerViewProvider>
  )
}
