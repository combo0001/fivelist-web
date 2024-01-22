/* eslint-disable no-undef */
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'

import { UsersViewMain } from './main'
import { UserViewProvider } from './providers/UserViewProvider'
import { getServerHelper } from '@/utils/supabaseHealper'
import { clientNamespaces, loadTranslations } from 'ni18n'
import { ni18nConfig } from '../../../../ni18n.config'
import { LanguageProvider, useLanguage } from '@/providers/LanguageProvider'

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

  if (customId && typeof customId === 'string') {
    const userPage = await helpers.users.getUserProfile.fetch({ customId })

    if (userPage) {
      const props = {
        userPage,
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
    <LanguageProvider>
      <UserViewProvider user={userPage}>
        <UsersViewMain />
      </UserViewProvider>
    </LanguageProvider>
  )
}
