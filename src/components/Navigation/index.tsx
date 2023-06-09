/* eslint-disable no-undef */

import { Text } from '@5list-design-system/react'

import { ListIcon, ProfileIcon, StarIcon, TwitchIcon } from '../Icons'
import { LinkContainer, NavigationContainer } from './style'

interface NavigationProps {
  user: any
}

export const Navigation = ({ user }: NavigationProps): JSX.Element => {
  return (
    <NavigationContainer>
      <ListLink />
      {user && (
        <>
          <CommunityLink />
          <StreamersLink />
        </>
      )}
      <AdsLink />
    </NavigationContainer>
  )
}

const ListLink = (): JSX.Element => (
  <LinkContainer href={'/home'}>
    <ListIcon css={{ size: '$6', fill: '$neutral100' }} />

    <Text size={'sm'}>Lista Fivem</Text>
  </LinkContainer>
)

const CommunityLink = (): JSX.Element => (
  <LinkContainer href={'/community'}>
    <ProfileIcon css={{ size: '$6', fill: '$neutral100' }} />

    <Text size={'sm'}>Comunidade</Text>
  </LinkContainer>
)

const StreamersLink = (): JSX.Element => (
  <LinkContainer href={'/streamers'}>
    <TwitchIcon css={{ size: '$6', fill: '$neutral100' }} />

    <Text size={'sm'}>Streamers</Text>
  </LinkContainer>
)

const AdsLink = (): JSX.Element => (
  <LinkContainer href={'/advertising'}>
    <StarIcon css={{ size: '$6', fill: '$neutral100' }} />

    <Text size={'sm'}>Anuncie</Text>
  </LinkContainer>
)
