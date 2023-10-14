/* eslint-disable no-undef */
import { createContextInner } from '@/server/context'
import { appRouter } from '@/server/routers/_app'
import { createServerSideHelpers } from '@trpc/react-query/server'
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import SuperJSON from 'superjson'

import { UsersEditMain } from './main'
import { UserEditorProvider } from './providers/UserEditorProvider'
import { useClientUser } from '@/providers/UserProvider'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

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

  const userPage = await helpers.users.getUserProfile.fetch({ customId })

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

export default function UsersEdit({
  userPage,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const router = useRouter()
  const { user } = useClientUser()

  useEffect(() => {
    if (user?.id !== userPage.id) {
      router.push('/home')
    }
  })

  if (!userPage) {
    return <></>
  }

  return (
    <UserEditorProvider user={userPage}>
      <UsersEditMain />
    </UserEditorProvider>
  )
}
