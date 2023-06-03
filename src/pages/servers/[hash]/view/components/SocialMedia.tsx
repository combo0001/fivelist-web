import {
  AtIcon,
  FacebookIcon,
  InstagramIcon,
  TiktokIcon,
  TwitterIcon,
  YoutubeIcon,
} from '@/components/Icons'
import { Heading, Text } from '@5list-design-system/react'
import { styled } from '@/styles'

/* eslint-disable no-undef */
interface SocialMediaProps {
  links: ServersType.SocialMediaLinksObject[]
}

const SocialMediaContainer = styled('div', {
  minHeight: '13.875rem',
  height: 'fit-content',

  padding: '$6',

  background: 'transparent',
  border: '0.0625rem solid $neutral800',
  borderRadius: '$lg',

  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
})

const SocialLinksContainer = styled('ul', {
  width: '100%',

  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  '& > *': {
    listStyleType: 'none',
  },
})

const SocialMediaLinkBox = styled('li', {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
})

export const SocialMedia = ({ links }: SocialMediaProps): JSX.Element => {
  const getPlatformIcon = (platform: SocialMediaPlatform): JSX.Element => {
    switch (platform) {
      case 'INSTAGRAM':
        return <InstagramIcon css={{ size: '$6', fill: '$white' }} />
      case 'FACEBOOK':
        return <FacebookIcon css={{ size: '$6', fill: '$white' }} />
      case 'TIKTOK':
        return <TiktokIcon css={{ size: '$6', fill: '$white' }} />
      case 'TWITTER':
        return <TwitterIcon css={{ size: '$6', fill: '$white' }} />
      case 'YOUTUBE':
        return <YoutubeIcon css={{ size: '$6', fill: '$white' }} />
      default:
        return <AtIcon css={{ size: '$6', fill: '$white' }} />
    }
  }

  return (
    <SocialMediaContainer>
      <Heading as={'h4'} weight={'bold'}>
        Redes sociais
      </Heading>

      <SocialLinksContainer>
        {links.map(({ platform, userId }, index) => {
          console.log(platform)
          return (
            <SocialMediaLinkBox key={index}>
              {getPlatformIcon(platform)}

              <Text size={'sm'} color={'$white'} weight={'bold'}>
                @{userId}
              </Text>
            </SocialMediaLinkBox>
          )
        })}
      </SocialLinksContainer>
    </SocialMediaContainer>
  )
}
