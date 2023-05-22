/* eslint-disable no-undef */
import {
  DiscordAnchor,
  DiscordSection,
  HeaderContainer,
  PerfilAnchor,
  PerfilSection,
} from './style'

import { Discord as DiscordIcon, Perfil as PerfilIcon } from '../Icons'
import { Text } from '@5list-design-system/react'

interface HeaderProps {
  user: any
}

export const Header = ({ user }: HeaderProps): JSX.Element => {
  const isLogged = !!user

  let authConteiner: JSX.Element

  if (isLogged) {
    authConteiner = <Perfil user={user} />
  } else {
    authConteiner = <></>
  }

  return (
    <HeaderContainer>
      {authConteiner}
      <Discord inviteUrl={'https://discord.gg/aTGQYBwexY'} />
    </HeaderContainer>
  )
}

interface PerfilProps {
  user: any
}

const Perfil = ({ user }: PerfilProps): JSX.Element => (
  <PerfilSection>
    <PerfilAnchor href={`/users/${user.customId}`}>
      <PerfilIcon fill={'$neutral100'} width={'$6'} height={'$6'} />

      <Text size={'sm'}>Perfil</Text>
    </PerfilAnchor>
  </PerfilSection>
)

interface DiscordProps {
  inviteUrl: string
}

const Discord = ({ inviteUrl }: DiscordProps): JSX.Element => (
  <DiscordSection>
    <DiscordAnchor target={'_blank'} href={inviteUrl}>
      <DiscordIcon fill={'$neutral100'} width={'$6'} height={'$6'} />

      <Text size={'sm'}>Acesse nosso discord</Text>
    </DiscordAnchor>
  </DiscordSection>
)
