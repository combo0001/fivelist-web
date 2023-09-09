import { Link } from '@5list-design-system/react'
import NextLink from 'next/link'

import { styled } from '../../styles'
import {
  DiscordIcon as DiscordIconNoStylized,
  ProfileIcon as ProfileIconNoStylized,
} from '../Icons'

export const HeaderContainer = styled('header', {
  width: '100%',
  padding: '0 $4',

  background: '$neutral900',

  display: 'flex',
  flexDirection: 'row-reverse',
  alignItems: 'center',

  borderBottom: '0.0625rem solid $neutral700',
})

export const ProfileSection = styled('section', {
  height: '100%',

  padding: '0 $6',
  borderLeft: '0.0625rem solid $neutral800',

  display: 'flex',
  alignItems: 'center',
})

export const SignOutButton = styled('button', {
  all: 'unset',
  height: '100%',

  padding: '0 $6',
  borderLeft: '0.0625rem solid $neutral800',

  cursor: 'pointer',

  display: 'flex',
  alignItems: 'center',
})

export const ProfileIcon = styled(ProfileIconNoStylized, {
  size: '$6',
  fill: '$neutral100',
})

export const ProfileAnchor = styled(NextLink, {
  textDecoration: 'none',

  display: 'flex',
  gap: '$2',
})

export const DiscordSection = styled('section', {
  height: '100%',

  padding: '0 $6',
  borderLeft: '0.0625rem solid $neutral800',

  display: 'flex',
  alignItems: 'center',
})

export const DiscordIcon = styled(DiscordIconNoStylized, {
  size: '$6',
  fill: '$neutral100',
})

export const DiscordAnchor = styled(Link, {
  display: 'flex',
  gap: '$2',
})

export const AuthButtonsSection = styled('section', {
  height: '100%',

  padding: '0 $6',
  borderLeft: '0.0625rem solid $neutral800',

  display: 'flex',
  alignItems: 'center',
  gap: '$4',
})
