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
  SignOutButton
} from './style'
import { UserIdentitySchemaType } from '@/schemas/users/IdentitySchema'
import { SignOutIcon } from '../Icons'
import { useClientUser } from '@/providers/UserProvider'

interface HeaderProps {
  user: UserIdentitySchemaType | null
}

export const Header = ({ user }: HeaderProps): JSX.Element => {
  const { signOut } = useClientUser()

  const handleOnSignOut = async (): Promise<void> => {
    await signOut()
  }

  const isLogged = !!user
  let authSection: JSX.Element

  if (isLogged) {
    authSection = <>
      <Profile user={user} />

      <SignOutButton onClick={handleOnSignOut}>
        <SignOutIcon css={{ fill: '$neutral100', size: '$6' }} />
      </SignOutButton>
    </>
  } else {
    authSection = <AuthButtons />
  }

  return (
    <HeaderContainer>
      {authSection}

      <Discord inviteURL={'https://discord.gg/aTGQYBwexY'} />
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

      <Text size={'sm'}>Perfil</Text>
    </ProfileAnchor>
  </ProfileSection>
)

interface DiscordProps {
  inviteURL: string
}

const Discord = ({ inviteURL }: DiscordProps): JSX.Element => (
  <DiscordSection>
    <DiscordAnchor target={'_blank'} href={inviteURL}>
      <DiscordIcon />

      <Text size={'sm'}>Acesse nosso discord</Text>
    </DiscordAnchor>
  </DiscordSection>
)

const AuthButtons = (): JSX.Element => (
  <AuthButtonsSection>
    <Link href={'/signin'} legacyBehavior>
      <Button outlined>Conectar</Button>
    </Link>

    <Link href={'/signup'} legacyBehavior>
      <Button>Cadastre-se</Button>
    </Link>
  </AuthButtonsSection>
)
