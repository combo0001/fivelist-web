/* eslint-disable no-undef */

import { UserProvider } from '@/providers/UserProvider'
import { GetStaticPaths, GetStaticProps } from 'next'

import { UsersViewMain } from './main'

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<
  any,
  { custom_id: string }
> = async ({ params }) => {
  const customId = params?.custom_id as string
  const props = {
    user: {
      customId,
    } as UserType.UserObject,
  }

  return {
    props,
    revalidate: 60,
  }
}

export interface UsersProps {
  user: UserType.UserObject
}

export default function UsersView({ user }: UsersProps): JSX.Element {
  return (
    <UserProvider>
      <UsersViewMain user={user} />
    </UserProvider>
  )
}
