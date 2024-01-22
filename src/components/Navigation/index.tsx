/* eslint-disable no-undef */

import { Select, Text } from '@5list-design-system/react'

import { ListIcon, ProfileIcon, StarIcon, TwitchIcon } from '../Icons'
import { LinkContainer, NavigationContainer } from './style'
import { UserIdentitySchemaType } from '@/schemas/users/IdentitySchema'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '@/providers/LanguageProvider'

interface NavigationProps {
  user: UserIdentitySchemaType | null
}

type LanguagesAvailableType = { [key: string]: { nativeName: string } }

const LANGUAGES: LanguagesAvailableType = {
  'pt-BR': { nativeName: 'Português' },
  'en-US': { nativeName: 'English' },
  'es-ES': { nativeName: 'Español' },
}

export const Navigation = ({ user }: NavigationProps): JSX.Element => {
  const { i18n, t } = useTranslation('navigation')
  const { changeLanguage } = useLanguage()

  const handleOnChangeLanguage = (lng: string) => {
    changeLanguage(lng)
  }

  return (
    <NavigationContainer>
      <ListLink />
      <AdsLink />

      {user && (
        <>
          <CommunityLink />
          <StreamersLink />
        </>
      )}

      <Select
        openTo={'up'}
        width={'13rem'}
        height={'$12'}
        placeHolder={t('languagePlaceHolder')}
        options={Object.keys(LANGUAGES).map((key) => ({
          value: key,
          label: LANGUAGES[key].nativeName,
        }))}
        onValueChange={handleOnChangeLanguage}
      />
    </NavigationContainer>
  )
}

const ListLink = (): JSX.Element => {
  const { t } = useTranslation('navigation')

  return (
    <LinkContainer href={'/home'}>
      <ListIcon css={{ size: '$6', fill: '$neutral100' }} />

      <Text size={'sm'}>{t('home')}</Text>
    </LinkContainer>
  )
}

const AdsLink = (): JSX.Element => {
  const { t } = useTranslation('navigation')

  return (
    <LinkContainer href={'/advertising'}>
      <StarIcon css={{ size: '$6', fill: '$neutral100' }} />

      <Text size={'sm'}>{t('advertising')}</Text>
    </LinkContainer>
  )
}

const CommunityLink = (): JSX.Element => {
  const { t } = useTranslation('navigation')

  return (
    <LinkContainer
      href={'/community'}
      css={{ opacity: 0.3, cursor: 'not-allowed' }}
    >
      <ProfileIcon css={{ size: '$6', fill: '$neutral100' }} />

      <Text size={'sm'}>{t('community')}</Text>
    </LinkContainer>
  )
}

const StreamersLink = (): JSX.Element => {
  const { t } = useTranslation('navigation')

  return (
    <LinkContainer
      href={'/streamers'}
      css={{ opacity: 0.3, cursor: 'not-allowed' }}
    >
      <TwitchIcon css={{ size: '$6', fill: '$neutral100' }} />

      <Text size={'sm'}>{t('streamers')}</Text>
    </LinkContainer>
  )
}
