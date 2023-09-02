/* eslint-disable no-undef */

import {
  EyeIcon,
  PencilIcon,
  PointsIcon,
  ProfileIcon,
  StatusIcon,
} from '@/components/Icons'
import { UserProfileSchemaType } from '@/@types/schemas/users/ProfileSchema'
import { styled } from '@/styles'
import { Button, Heading, Text } from '@5list-design-system/react'
import * as Progress from '@radix-ui/react-progress'
import Image from 'next/image'
import { useClientUser } from '@/providers/UserProvider'
import Link from 'next/link'

interface ProfileHeaderProps {
  user: UserProfileSchemaType
}

const HeaderWrapper = styled('section', {
  userSelect: 'none',

  width: '100%',

  display: 'grid',
  gridTemplateRows: '1fr',
  gridTemplateColumns: '1fr',

  '& > *': {
    gridRow: 1,
    gridColumn: 1,
  },

  '& > *:nth-child(1)': {
    zIndex: 0,
  },

  '& > *:nth-child(2)': {
    zIndex: 1,
  },

  '& > *:nth-child(3)': {
    zIndex: 2,
  },

  variants: {
    hasVip: {
      true: {
        height: '30.25rem',
      },
      false: {
        height: '25.5rem',
      },
    },
  },

  defaultVariants: {
    hasVip: false,
  },
})

const HeaderContainer = styled('section', {
  width: '100%',
  height: '100%',

  padding: '0 $8 $6 $8',

  display: 'flex',
  flexDirection: 'column',
})

const HeaderTopContainer = styled('div', {
  width: '100%',
  height: '$20',

  padding: '0.9063rem $12',
  
  display: 'flex',
  gap: '$6',
  alignItems: 'center',
})

const EditButton = styled(Button, {
  marginLeft: 'auto',

  gap: '$3',
})

const InformationsContainer = styled('section', {
  marginTop: 'auto',

  width: '100%',

  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
})

const Divisor = styled('div', {
  width: '100%',
  height: '0.0625rem',

  background: '$neutral100',
  opacity: 0.1,
})

export const ProfileHeader = ({ user }: ProfileHeaderProps): JSX.Element => {
  const { user: clientUser } = useClientUser()

  const isClientProfile = clientUser?.id === user.id
  const hasBanner = !!(
    user.planTier.privileges.PROFILE_HEADER && user.page.bannerURL
  )

  return (
    <HeaderWrapper hasVip={hasBanner}>
      {hasBanner && <Banner src={user.page.bannerURL as string} />}

      <HeaderContainer>
        <HeaderTopContainer>
          {isClientProfile && (
            <Link href={`/users/${user.customId}/edit`} legacyBehavior>
              <EditButton size={'sm'}>
                Editar
                <PencilIcon css={{ size: '$4', fill: '$white' }} />
              </EditButton>
            </Link>
          )}
        </HeaderTopContainer>

        <InformationsContainer>
          <DataTags
            followers={user.page.statistics.followers}
            views={user.page.statistics.views}
          />

          <Profile
            name={user.page.name.split(/\s/).at(0) as string}
            nickname={user.customId}
            isOnline={user.page.isOnline}
            avatarURL={
              user.page.avatarURL
                ? user.page.avatarURL
                : 'https://cdn.discordapp.com/attachments/923436122871308308/1120117167925501982/image.png'
            }
          />

          <Level
            level={{
              id: user.page.level.currentLevel.id,
              points: user.page.level.nextLevel.points,
            }}
            points={user.page.level.points}
          />

          <Divisor />

          <Button size={'lg'}>Seguir</Button>
        </InformationsContainer>
      </HeaderContainer>
    </HeaderWrapper>
  )
}

interface BannerProps {
  src?: string
}

const BannerImage = styled(Image, {
  width: '100%',
  height: '30.25rem',

  objectFit: 'cover',
  opacity: 0.2,
})

const BannerOverlay = styled('div', {
  width: '100%',
  height: '30.25rem',

  background:
    'linear-gradient(360deg, rgba(0, 0, 0, 1) 19.32%, rgba(0, 0, 0, 0) 75.31%)',
  opacity: 0.8,
})

const Banner = ({ src }: BannerProps): JSX.Element => {
  return (
    <>
      {src && <BannerImage src={src} alt={''} width={1200} height={484} />}

      <BannerOverlay />
    </>
  )
}

interface DataTagsProps {
  followers: number
  views: number
}

const TagsContainer = styled('section', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',
})

const TagBox = styled('div', {
  padding: '$2 $4',

  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  background: '$neutral800',
  borderRadius: '1.25rem',
})

const DataTags = ({ followers, views }: DataTagsProps): JSX.Element => {
  return (
    <TagsContainer>
      <TagBox>
        <ProfileIcon css={{ size: '$6', fill: '$white' }} />
        {followers.toLocaleString()} seguidores
      </TagBox>

      <TagBox>
        <EyeIcon css={{ size: '$6', fill: '$white' }} />
        {views.toLocaleString()} vizualizações no perfil
      </TagBox>
    </TagsContainer>
  )
}

interface ProfileProps {
  name: string
  nickname: string
  isOnline: boolean
  avatarURL: string
}

const ProfileContainer = styled('section', {
  display: 'flex',
  gap: '$4',
})

const AvatarWrapper = styled('div', {
  size: '4.375rem',

  display: 'grid',
  gridTemplateRows: '1fr',
  gridTemplateColumns: '1fr',

  '& > *': {
    gridRow: 1,
    gridColumn: 1,
  },
})

const OnlineStatus = styled(StatusIcon, {
  alignSelf: 'start',
  justifySelf: 'end',

  size: '$6',
  stroke: '$neutral800',

  variants: {
    online: {
      true: {
        fill: '$primary900',
      },
      false: {
        fill: '$neutral700',
      },
    },
  },

  defaultVariants: {
    online: false,
  },
})

const AvatarImage = styled(Image, {
  borderRadius: '$full',

  size: '4.375rem',
})

const NameContainer = styled('div', {
  display: 'flex',
  alignItems: 'flex-end',
  gap: '$2',
})

const Profile = ({
  name,
  nickname,
  isOnline,
  avatarURL,
}: ProfileProps): JSX.Element => {
  return (
    <ProfileContainer>
      <AvatarWrapper>
        <AvatarImage
          src={avatarURL}
          alt={'Profile avatar'}
          width={70}
          height={70}
        />

        <OnlineStatus online={isOnline} />
      </AvatarWrapper>

      <NameContainer>
        <Heading as={'h2'}>{nickname}</Heading>

        <Text
          size={'md'}
          css={{ fontSize: '1.125rem !important' }}
          weight={'normal'}
        >
          {name}
        </Text>
      </NameContainer>
    </ProfileContainer>
  )
}

interface LevelProps {
  level: {
    id: number
    points: number
  }
  points: number
}

const LevelContainer = styled('section', {
  display: 'flex',
  alignItems: 'center',
  gap: '$6',

  padding: '0 $2',
})

const PointsBox = styled('div', {
  display: 'flex',
  gap: '$2',
})

const ProgressBox = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$1',
})

const ProgressTitleContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const ProgressRoot = styled(Progress.Root, {
  width: '16.875rem',
  height: '0.0625rem',

  background: '$neutral200',
})

const ProgressIndicator = styled(Progress.Indicator, {
  height: '0.0625rem',

  background: '$success500',
})

const Level = ({ level, points }: LevelProps): JSX.Element => {
  const progress = Math.floor((points / level.points) * 100)

  return (
    <LevelContainer>
      <PointsBox>
        <PointsIcon css={{ fill: '$neutral200', size: '$6' }} />

        <Text size={'sm'} color={'$white'} weight={'bold'}>
          {points} Pts
        </Text>
      </PointsBox>

      <ProgressBox>
        <ProgressTitleContainer>
          <Text size={'xs'} color={'$success500'} weight={'bold'}>
            Level: {level.id}
          </Text>

          <Text size={'xs'} weight={'normal'}>
            {progress}%
          </Text>
        </ProgressTitleContainer>

        <ProgressRoot value={points} max={level.points}>
          <ProgressIndicator css={{ width: `${progress}%` }} />
        </ProgressRoot>
      </ProgressBox>
    </LevelContainer>
  )
}
