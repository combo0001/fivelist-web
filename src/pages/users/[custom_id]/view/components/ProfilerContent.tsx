/* eslint-disable no-undef */

import { styled } from '@/styles'

import { Description } from './Description'
import { Links } from './Links'
import { ServersPlayed } from './ServersPlayed'
import { StreamLink } from './StreamLink'

const ContentContainer = styled('section', {
  width: '100%',

  padding: '0 $8 $8 $8',

  display: 'grid',
  flexDirection: 'column',
  gap: '$8',
})

const InformationsContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridTemplateRows: 'repeat(3, auto)',
  gridGap: '$8',

  '& > *:nth-child(1)': {
    gridArea: '1 / 1 / 2 / 2',
  },

  '& > *:nth-child(2)': {
    gridArea: '1 / 2 / 2 / 3',
  },

  '& > *:nth-child(3)': {
    gridArea: '2 / 1 / 3 / 2',
  },

  '& > *:nth-child(4)': {
    gridArea: '2 / 2 / 3 / 3',
  },

  '& > *:nth-child(5)': {
    gridArea: '3 / 2 / 4 / 3',
  },

  '& > *:nth-child(6)': {
    gridArea: '3 / 3 / 4 / 4',
  },
})

export const ProfileContent = (): JSX.Element => {
  const hasVip = true

  return (
    <ContentContainer>
      {hasVip && (
        <Description
          text={
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
          }
        />
      )}

      <InformationsContainer>
        <Links
          title={'Redes sociais'}
          links={[
            { label: 'Github', url: 'https://github.com/combo0001' },
            { label: 'Twitch', url: 'https://github.com/combo0001' },
            { label: 'Instagram', url: 'https://github.com/combo0001' },
            { label: 'Tiktok', url: 'https://github.com/combo0001' },
            { label: 'Facebook', url: 'https://github.com/combo0001' },
            { label: 'Discord', url: 'https://github.com/combo0001' },
            { label: 'Youtube', url: 'https://github.com/combo0001' },
          ]}
        />

        <Links
          title={'Conexões'}
          links={[
            { label: 'Github', url: 'https://github.com/combo0001' },
            { label: 'Twitch', url: 'https://github.com/combo0001' },
          ]}
        />

        <StreamLink url={'https://www.twitch.tv/ryan_menezzes'} />

        <ServersPlayed
          servers={[
            {
              server: {
                clients: {
                  now: 1200,
                  onDay: 2564,
                },
                slots: 2023,
                bannerURL:
                  'https://cdn.discordapp.com/attachments/897332194811473951/1112740841988034600/Frame_1717.png',
                name: 'NARNIA ROLEPLAY >>>ABRIU AGORA<<< 🌈 SEM WL, ENTRE AGORA E GANHE UM VIP! #LOTUSGROUP',
                description:
                  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                followers: 10,
                hasVip: true,
                likes: 12834,
                reviews: 12,
                cfxHash: 'poa233',
                tags: {
                  discord: '#',
                  store: '#',
                  website: '#',
                },
                endpoint: '127.0.0.1:30120',
              },
              hours: 233,
            },
            {
              server: {
                clients: {
                  now: 1200,
                  onDay: 2564,
                },
                slots: 2023,
                bannerURL:
                  'https://cdn.discordapp.com/attachments/897332194811473951/1112740841988034600/Frame_1717.png',
                name: 'NARNIA ROLEPLAY >>>ABRIU AGORA<<< 🌈 SEM WL, ENTRE AGORA E GANHE UM VIP! #LOTUSGROUP',
                description:
                  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                followers: 10,
                hasVip: true,
                likes: 12834,
                reviews: 12,
                cfxHash: 'poa233',
                tags: {
                  discord: '#',
                  store: '#',
                  website: '#',
                },
                endpoint: '127.0.0.1:30120',
              },
              hours: 233,
            },
          ]}
        />
      </InformationsContainer>
    </ContentContainer>
  )
}
