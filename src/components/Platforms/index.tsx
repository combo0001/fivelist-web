/* eslint-disable no-undef */

import {
  AtIcon,
  FacebookIcon,
  InstagramIcon,
  TiktokIcon,
  TwitterIcon,
  YoutubeIcon,
} from '@/components/Icons'
import { SocialMediaSchemaType } from '@/schemas/SocialMediaSchema'

export const getPlatformIcon = (platform: SocialMediaSchemaType): JSX.Element => {
  switch (platform) {
    case 'INSTAGRAM':
      return <InstagramIcon css={{ size: '$6', fill: '$white' }} />
    case 'FACEBOOK':
      return <FacebookIcon css={{ size: '$6', fill: '$white' }} />
    case 'TIKTOK':
      return <TiktokIcon css={{ size: '$6', fill: '$white' }} />
    case 'YOUTUBE':
      return <YoutubeIcon css={{ size: '$6', fill: '$white' }} />
    default:
      return <AtIcon css={{ size: '$6', fill: '$white' }} />
  }
}
