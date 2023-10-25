/* eslint-disable no-undef */
import { Button, Text } from '@5list-design-system/react'
import {
  AuthButtonsSection,
  DiscordAnchor,
  DiscordIcon,
  DiscordSection,
  HeaderContainer,
  LogoContainer,
  ProfileAnchor,
  ProfileIcon,
  ProfileSection,
  SignOutButton,
} from './style'
import { UserIdentitySchemaType } from '@/schemas/users/IdentitySchema'
import { SignOutIcon } from '../Icons'
import { useClientUser } from '@/providers/UserProvider'
import LogoImage from '@/assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

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
    authSection = (
      <>
        <Profile user={user} />

        <SignOutButton onClick={handleOnSignOut}>
          <SignOutIcon css={{ fill: '$neutral100', size: '$6' }} />
        </SignOutButton>
      </>
    )
  } else {
    authSection = <AuthButtons />
  }

  return (
    <HeaderContainer>
      {authSection}

      <Discord inviteURL={'https://discord.gg/aTGQYBwexY'} />

      <LogoContainer href={'/home'}>
        <Image src={LogoImage} alt="" width={40} height={40} />
      </LogoContainer>
    </HeaderContainer>
  )
}

interface ProfileProps {
  user: any
}

const Profile = ({ user }: ProfileProps): JSX.Element => {
  const { t } = useTranslation('header')

  return (
    <ProfileSection>
      <ProfileAnchor href={`/users/${user.customId}`}>
        <ProfileIcon />

        <Text size={'sm'}>{t('profile')}</Text>
      </ProfileAnchor>
    </ProfileSection>
  )
}

interface DiscordProps {
  inviteURL: string
}

const Discord = ({ inviteURL }: DiscordProps): JSX.Element => {
  const { t } = useTranslation('header')

  return (
    <DiscordSection>
      <DiscordAnchor target={'_blank'} href={inviteURL}>
        <DiscordIcon />

        <Text size={'sm'}>{t('discordInvite')}</Text>
      </DiscordAnchor>
    </DiscordSection>
  )
}

const AuthButtons = (): JSX.Element => {
  const { t } = useTranslation('header')

  return (
    <AuthButtonsSection>
      <Link href={'/signin'} legacyBehavior>
        <Button outlined>{t('signIn')}</Button>
      </Link>

      <Link href={'/signup'} legacyBehavior>
        <Button>{t('signUp')}</Button>
      </Link>
    </AuthButtonsSection>
  )
}
