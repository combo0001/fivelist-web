/* eslint-disable no-undef */
import { styled } from '@/styles'

import { useServer } from '../../providers/ServerProvider'
import { Description } from './Description'
import { SocialMedia } from './SocialMedia'
import { Statistic } from './Statistic'
import { WebsiteLinks } from './WebsiteLinks'
import { CustomLink } from './CustomLink'
import { Players } from './Players'

const ContentContainer = styled('section', {
  width: '94.5%',

  display: 'grid',
  gridTemplateRows: 'auto auto auto auto',
  gridTemplateColumns: '1fr 1fr',
  gridGap: '$8',

  paddingBottom: '5.125rem',

  '& > *:nth-child(1)': {
    gridArea: '1 / 1 / 2 / 3',
  },

  '& > *:nth-child(2)': {
    gridArea: '2 / 1 / 3 / 2',
  },

  '& > *:nth-child(3)': {
    gridArea: '2 / 2 / 3 / 3',
  },

  '& > *:nth-child(4)': {
    gridArea: '3 / 1 / 4 / 2',
  },

  '& > *:nth-child(5)': {
    gridArea: '3 / 2 / 4 / 3',
  },

  '& > *:nth-child(6)': {
    gridArea: '4 / 1 / 5 / 3',
  },
})

export const ServerContent = (): JSX.Element => {
  const { description, hasVip, likes, followers, cfxHash, clients, slots } =
    useServer()

  return (
    <ContentContainer>
      <Description text={description} hasVip={hasVip} />

      <WebsiteLinks
        links={[
          {
            label: 'Nossa loja!',
            url: 'https://google.com',
          },
          {
            label: 'Nosso site!',
            url: 'https://google.com',
          },
        ]}
      />

      <SocialMedia
        links={[
          {
            platform: 'TWITTER' as any,
            userId: '1combofn',
          },
          {
            platform: 'INSTAGRAM' as any,
            userId: 'jbfilhoreporter',
          },
          {
            platform: 'FACEBOOK' as any,
            userId: 'combo',
          },
          {
            platform: 'TIKTOK' as any,
            userId: 'lucadorea',
          },
          {
            platform: 'YOUTUBE' as any,
            userId: 'combo',
          },
        ]}
      />

      <Statistic
        cfxHash={cfxHash}
        likes={{ amount: likes, variation: 0 }}
        followers={{ amount: followers, variation: 20 }}
        hasVip={hasVip}
      />

      <CustomLink id={'narniaroleplay'} />

      <Players
        clients={clients.now}
        slots={slots}
        players={[
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            likes: 12744,
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            likes: 12744,
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            likes: 12744,
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            likes: 12744,
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            likes: 12744,
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            likes: 12744,
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            likes: 12744,
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            likes: 12744,
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            likes: 12744,
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            likes: 12744,
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            likes: 12744,
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            likes: 12744,
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            likes: 12744,
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            likes: 12744,
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            likes: 12744,
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            likes: 12744,
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            likes: 12744,
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            likes: 12744,
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            likes: 12744,
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            likes: 12744,
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            likes: 12744,
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            likes: 12744,
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            likes: 12744,
            startedAt: new Date(1685825570941),
          },
        ]}
      />
    </ContentContainer>
  )
}
