/* eslint-disable no-undef */

import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { ServerEditMain } from './main'
import { getServerHelper } from '@/utils/getServerHelper'
import { ServerEditorProvider } from './providers/ServerEditorProvider'
import { useEffect } from 'react'
import { useClientUser } from '@/providers/UserProvider'
import { router } from '@/server/trpc'
import { useRouter } from 'next/navigation'

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
    const serverPage = await helpers.servers.getServerProfile.fetch({ joinId: customId })
    
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

export default function ServerEdit({ serverPage }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  if (!serverPage) {
    return <></>
  }

  const router = useRouter()
  const { user } = useClientUser()

  useEffect(() => {
    if (!user || !serverPage) return

    const isOwner = user && serverPage.page.ownerUser && serverPage.page.ownerUser?.id === user?.id 

    if (!isOwner) {
      router.push(`/servers/${serverPage.joinId}`)
    }
  }, [ serverPage, user ])

  return (
    <ServerEditorProvider server={serverPage}>
      <ServerEditMain />
    </ServerEditorProvider>
  )
}
