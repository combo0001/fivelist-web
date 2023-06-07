/* eslint-disable no-undef */
import { styled } from '@/styles'

import { useServer } from '../../providers/ServerProvider'
import { Description } from './Description'
import { Players } from './Players'
import { Reviews } from './Reviews'
import { SocialMedia } from './SocialMedia'
import { Statistic } from './Statistic'
import { Streamers } from './Streamers'
import { WebsiteLinks } from './WebsiteLinks'

const ContentContainer = styled('section', {
  width: '94.5%',

  display: 'grid',
  gridTemplateRows: 'auto auto auto auto',
  gridTemplateColumns: '552fr 48fr 472fr',
  gridGap: '$8',

  paddingBottom: '5.125rem',

  '& > *:nth-child(1)': {
    gridArea: '1 / 1 / 2 / 3',
  },

  '& > *:nth-child(2)': {
    gridArea: '1 / 3 / 2 / 4',
  },

  '& > *:nth-child(3)': {
    gridArea: '2 / 1 / 3 / 2',
  },

  '& > *:nth-child(4)': {
    gridArea: '2 / 2 / 3 / 4',
  },

  '& > *:nth-child(5)': {
    gridArea: '3 / 1 / 4 / 4',
  },

  '& > *:nth-child(6)': {
    gridArea: '4 / 1 / 5 / 3',
  },

  '& > *:nth-child(7)': {
    gridArea: '4 / 3 / 5 / 4',
  },
})

export const ServerContent = (): JSX.Element => {
  const { description, hasVip, clients, slots } = useServer()

  return (
    <ContentContainer>
      <Description text={description} hasVip={hasVip} />

      <Statistic players={clients.onDay} />

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

      <Streamers
        streamers={[
          {
            bannerURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114595213558685696/image.png',
            streamer: 'WILLZERA',
            title: 'Matando geral no GTA RP..',
            viewers: 34005,
          },
          {
            bannerURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114595213558685696/image.png',
            streamer: 'WILLZERA',
            title: 'Matando geral no GTA RP..',
            viewers: 34005,
          },
          {
            bannerURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114595213558685696/image.png',
            streamer: 'WILLZERA',
            title: 'Matando geral no GTA RP..',
            viewers: 34005,
          },
          {
            bannerURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114595213558685696/image.png',
            streamer: 'WILLZERA',
            title: 'Matando geral no GTA RP..',
            viewers: 34005,
          },
          {
            bannerURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114595213558685696/image.png',
            streamer: 'WILLZERA',
            title: 'Matando geral no GTA RP..',
            viewers: 34005,
          },
          {
            bannerURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114595213558685696/image.png',
            streamer: 'WILLZERA',
            title: 'Matando geral no GTA RP..',
            viewers: 34005,
          },
          {
            bannerURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114595213558685696/image.png',
            streamer: 'WILLZERA',
            title: 'Matando geral no GTA RP..',
            viewers: 34005,
          },
          {
            bannerURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114595213558685696/image.png',
            streamer: 'WILLZERA',
            title: 'Matando geral no GTA RP..',
            viewers: 34005,
          },
          {
            bannerURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114595213558685696/image.png',
            streamer: 'WILLZERA',
            title: 'Matando geral no GTA RP..',
            viewers: 34005,
          },
          {
            bannerURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114595213558685696/image.png',
            streamer: 'WILLZERA',
            title: 'Matando geral no GTA RP..',
            viewers: 34005,
          },
          {
            bannerURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114595213558685696/image.png',
            streamer: 'WILLZERA',
            title: 'Matando geral no GTA RP..',
            viewers: 34005,
          },
          {
            bannerURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114595213558685696/image.png',
            streamer: 'WILLZERA',
            title: 'Matando geral no GTA RP..',
            viewers: 34005,
          },
          {
            bannerURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114595213558685696/image.png',
            streamer: 'WILLZERA',
            title: 'Matando geral no GTA RP..',
            viewers: 34005,
          },
          {
            bannerURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114595213558685696/image.png',
            streamer: 'WILLZERA',
            title: 'Matando geral no GTA RP..',
            viewers: 34005,
          },
        ]}
      />

      <Reviews
        reviews={[
          {
            author: {
              name: 'Willian',
              avatarURL:
                'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            },
            rate: 4,
            message: 'Achei legal o servidor mas acho que deveria melhorar.',
            createdAt: new Date(1685825570941),
          },
          {
            author: {
              name: 'Willian',
              avatarURL:
                'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            },
            rate: 2,
            message: 'Achei legal o servidor mas acho que deveria melhorar.',
            createdAt: new Date(1685825570941),
          },
          {
            author: {
              name: 'Willian',
              avatarURL:
                'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            },
            rate: 0,
            message: 'Achei legal o servidor mas acho que deveria melhorar.',
            createdAt: new Date(1685825570941),
          },
          {
            author: {
              name: 'Willian',
              avatarURL:
                'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            },
            rate: 1,
            message: 'Achei legal o servidor mas acho que deveria melhorar.',
            createdAt: new Date(1685825570941),
          },
          {
            author: {
              name: 'Willian',
              avatarURL:
                'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            },
            rate: 5,
            message:
              'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
            createdAt: new Date(1685825570941),
          },
        ]}
      />

      <Players
        clients={clients.now}
        slots={slots}
        players={[
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            startedAt: new Date(1685825570941),
          },
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            startedAt: new Date(1685825570941),
          },
        ]}
      />
    </ContentContainer>
  )
}
