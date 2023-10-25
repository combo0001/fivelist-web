/* eslint-disable no-undef */
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { HomeMain } from './main'
import { ServersListProvider } from './providers/ServersListProvider'
import { getServerHelper } from '@/utils/getServerHelper'
import { ni18nConfig } from '../../../ni18n.config'
import { clientNamespaces, loadTranslations } from 'ni18n'
import { LanguageProvider } from '@/providers/LanguageProvider'

export const getStaticProps = async () => {
  const helpers = await getServerHelper()

  const servers = await helpers.servers.getServerList.fetch()
  const props = {
    servers,
  }

  const serverLanguageProps = await loadTranslations(ni18nConfig, undefined, [ 'header', 'navigation', 'pages' ])
  const clientLanguageProps = clientNamespaces(ni18nConfig, [ 'dialogs', 'notifications' ])

  return {
    props: {
      ...serverLanguageProps,
      ...clientLanguageProps,
      ...props,
    },
    revalidate: 300,
  }
}

export default function UsersView({
  servers,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  if (!servers) {
    return <></>
  }

  return (
    <LanguageProvider>
      <ServersListProvider servers={servers} newServers={[]}>
        <HomeMain />
      </ServersListProvider>
    </LanguageProvider>
  )
}
