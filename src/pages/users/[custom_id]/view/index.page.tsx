/* eslint-disable no-undef */

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
    } as any,
  }

  return {
    props,
    revalidate: 60,
  }
}

export interface UsersProps {
  user: any
}

export default function UsersView({ user }: UsersProps): JSX.Element {
  return <UsersViewMain user={user} />
}
