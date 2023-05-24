import { Button, Text } from '@5list-design-system/react'
import Link from 'next/link'

/* eslint-disable no-undef */
import {
  AuthButtonsSection,
  DiscordAnchor,
  DiscordIcon,
  DiscordSection,
  HeaderContainer,
  PerfilAnchor,
  PerfilIcon,
  PerfilSection,
} from './style'

interface HeaderProps {
  user: any
}

export const Header = ({ user }: HeaderProps): JSX.Element => {
  const isLogged = !!user

  let authSection: JSX.Element

  if (isLogged) {
    authSection = <Perfil user={user} />
  } else {
    authSection = <AuthButtons />
  }

  return (
    <HeaderContainer>
      {authSection}

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
      <PerfilIcon />

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
      <DiscordIcon />

      <Text size={'sm'}>Acesse nosso discord</Text>
    </DiscordAnchor>
  </DiscordSection>
)

const AuthButtons = (): JSX.Element => (
  <AuthButtonsSection>
    <Link href={'/login'} legacyBehavior>
      <Button outlined>Conectar</Button>
    </Link>

    <Link href={'/signup'} legacyBehavior>
      <Button>Cadastre-se</Button>
    </Link>
  </AuthButtonsSection>
)
