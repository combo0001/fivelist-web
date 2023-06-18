import { Button, Text } from '@5list-design-system/react'
import Link from 'next/link'

/* eslint-disable no-undef */
import {
  AuthButtonsSection,
  DiscordAnchor,
  DiscordIcon,
  DiscordSection,
  HeaderContainer,
  ProfileAnchor,
  ProfileIcon,
  ProfileSection,
} from './style'

interface HeaderProps {
  user: any
}

export const Header = ({ user }: HeaderProps): JSX.Element => {
  const isLogged = !!user

  let authSection: JSX.Element

  if (isLogged) {
    authSection = <Profile user={user} />
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

interface ProfileProps {
  user: any
}

const Profile = ({ user }: ProfileProps): JSX.Element => (
  <ProfileSection>
    <ProfileAnchor href={`/users/${user.customId}`}>
      <ProfileIcon />

      <Text size={'sm'}>Profile</Text>
    </ProfileAnchor>
  </ProfileSection>
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
