/* eslint-disable no-undef */

import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'

import { ServerEditMain } from './main'
import { getServerHelper } from '@/utils/supabaseHealper'
import { ServerEditorProvider } from './providers/ServerEditorProvider'
import { useEffect } from 'react'
import { useClientUser } from '@/providers/UserProvider'
import { useRouter } from 'next/navigation'
import { ni18nConfig } from '../../../../../ni18n.config'
import { clientNamespaces, loadTranslations } from 'ni18n'
import { LanguageProvider } from '@/providers/LanguageProvider'

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({
  params,
  locale,
}: GetStaticPropsContext<{
  custom_id: string
  locale: string | undefined
}>) => {
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

      const serverLanguageProps = await loadTranslations(ni18nConfig, locale, [
        'header',
        'navigation',
        'pages',
      ])
      const clientLanguageProps = clientNamespaces(ni18nConfig, [
        'dialogs',
        'notifications',
      ])

      return {
        props: {
          ...serverLanguageProps,
          ...clientLanguageProps,
          ...props,
        },
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

export default function ServerEdit({
  serverPage,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const router = useRouter()
  const { user } = useClientUser()

  useEffect(() => {
    if (!user || !serverPage) return

    const isOwner =
      user &&
      serverPage.page.ownerUser &&
      serverPage.page.ownerUser?.id === user?.id

    if (!isOwner) {
      router.push(`/servers/${serverPage.joinId}`)
    }
  }, [serverPage, user, router])

  if (!serverPage) {
    return <></>
  }

  return (
    <LanguageProvider>
      <ServerEditorProvider server={serverPage}>
        <ServerEditMain />
      </ServerEditorProvider>
    </LanguageProvider>
  )
}
