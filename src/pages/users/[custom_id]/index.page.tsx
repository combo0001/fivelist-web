/* eslint-disable no-undef */
import { DehydratedState } from '@tanstack/react-query'
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'

import { UsersViewMain } from './main'
import { UserViewProvider } from './providers/UserViewProvider'
import { getServerHelper } from '@/utils/getServerHelper'

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

  if (customId && typeof customId === 'string') {
    const userPage = await helpers.users.getUserProfile.fetch({ customId })
  
    if (userPage) {
      const props = {
        userPage,
      }
  
      return {
        props,
        revalidate: false,
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

export default function UsersView({
  userPage,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  if (!userPage) {
    return <></>
  }

  return (
    <UserViewProvider user={userPage}>
      <UsersViewMain />
    </UserViewProvider>
  )
}
