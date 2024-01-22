/* eslint-disable no-undef */

import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'

import { ServersViewMain } from './main'
import { getServerHelper } from '@/utils/supabaseHealper'
import { ServerViewProvider } from './providers/ServerViewProvider'
import { clientNamespaces, loadTranslations } from 'ni18n'
import { ni18nConfig } from '../../../../ni18n.config'
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

export default function ServersView({
  serverPage,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  if (!serverPage) {
    return <></>
  }

  return (
    <LanguageProvider>
      <ServerViewProvider server={serverPage}>
        <ServersViewMain />
      </ServerViewProvider>
    </LanguageProvider>
  )
}
