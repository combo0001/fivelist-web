/* eslint-disable no-undef */

import { Select, Text } from '@5list-design-system/react'

import { ListIcon, ProfileIcon, StarIcon, TwitchIcon } from '../Icons'
import { LinkContainer, NavigationContainer } from './style'
import { UserIdentitySchemaType } from '@/schemas/users/IdentitySchema'
import { useLanguage } from '@/providers/LanguageProvider'

interface NavigationProps {
  user: UserIdentitySchemaType | null
}

export const Navigation = ({ user }: NavigationProps): JSX.Element => {
  const { language, availableLanguages, changeLanguage } = useLanguage()

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
        placeHolder='Idioma'
        options={availableLanguages.map(({ id, name }) => ({
          value: id,
          label: name,
        }))}
        onValueChange={(value) => changeLanguage(value)}
      />
    </NavigationContainer>
  )
}

const ListLink = (): JSX.Element => (
  <LinkContainer href={'/home'}>
    <ListIcon css={{ size: '$6', fill: '$neutral100' }} />

    <Text size={'sm'}>Lista Fivem</Text>
  </LinkContainer>
)

const AdsLink = (): JSX.Element => (
  <LinkContainer href={'/advertising'}>
    <StarIcon css={{ size: '$6', fill: '$neutral100' }} />

    <Text size={'sm'}>Anuncie</Text>
  </LinkContainer>
)

const CommunityLink = (): JSX.Element => (
  <LinkContainer
    href={'/community'}
    css={{ opacity: 0.3, cursor: 'not-allowed' }}
  >
    <ProfileIcon css={{ size: '$6', fill: '$neutral100' }} />

    <Text size={'sm'}>Em breve</Text>
  </LinkContainer>
)

const StreamersLink = (): JSX.Element => (
  <LinkContainer
    href={'/streamers'}
    css={{ opacity: 0.3, cursor: 'not-allowed' }}
  >
    <TwitchIcon css={{ size: '$6', fill: '$neutral100' }} />

    <Text size={'sm'}>Em breve</Text>
  </LinkContainer>
)
