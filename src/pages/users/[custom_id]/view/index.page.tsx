/* eslint-disable no-undef */
import { createContextInner } from '@/server/context'
import { appRouter } from '@/server/routers/_app'
import { DehydratedState } from '@tanstack/react-query'
import { createServerSideHelpers } from '@trpc/react-query/server'
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import SuperJSON from 'superjson'

import { UsersViewMain } from './main'

export interface UsersViewProps {
  trpcState: DehydratedState
  customId: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

const getServerHelper = async () =>
  createServerSideHelpers({
    router: appRouter,
    ctx: await createContextInner(),
    transformer: SuperJSON,
  })

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ custom_id: string }>) => {
  const helpers = await getServerHelper()
  const customId = params?.custom_id as string

  const userPage = await helpers.users.getUserPage.fetch({ customId })

  if (userPage) {
    const props = {
      userPage,
    }

    return {
      props,
      revalidate: 60,
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

export default function UsersView({
  userPage,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return <UsersViewMain user={userPage} />
}
