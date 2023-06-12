/* eslint-disable no-undef */

import {
  AtIcon,
  FacebookIcon,
  InstagramIcon,
  TiktokIcon,
  TwitterIcon,
  YoutubeIcon,
} from '@/components/Icons'

export const getPlatformIcon = (platform: SocialMediaPlatform): JSX.Element => {
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
