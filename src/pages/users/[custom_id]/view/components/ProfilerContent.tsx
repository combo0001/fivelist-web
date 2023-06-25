/* eslint-disable no-undef */

import { styled } from '@/styles'

import { Description } from './Description'
import { LastServersPlayed } from './LastServersPlayed'
import { Links } from './Links'
import { Publications } from './Publications'
import { RecentActivities } from './RecentActivities'
import { ServersMostPlayed } from './ServersMostPlayed'
import { StreamLink } from './StreamLink'

const ContentContainer = styled('section', {
  width: '100%',

  padding: '0 $8 $8 $8',

  display: 'grid',
  flexDirection: 'column',
  gap: '$8',
})

const InformationsWrapper = styled('div', {
  display: 'flex',
  gap: '$8',

  '& > *': {
    width: 'calc(50% - $8 / 2)',
  },
})

const InformationsSide = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$8',
})

export const ProfileContent = (): JSX.Element => {
  const HAS_VIP = true

  return (
    <ContentContainer>
      {HAS_VIP && (
        <Description
          text={
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
          }
        />
      )}

      <InformationsWrapper>
        <InformationsSide>
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

          <StreamLink url={'https://www.twitch.tv/ryan_menezzes'} />

          <RecentActivities
            posts={[
              {
                author: {
                  avatarURL:
                    'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
                },
                message:
                  'Curtiu um comentário no servidor Narnia Roleplay “Melhor servidor que já joguei”',
                createdAt: new Date(1685825570941),
              },
              {
                author: {
                  avatarURL:
                    'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
                },
                message:
                  'Curtiu um comentário no servidor Narnia Roleplay “Melhor servidor que já joguei”',
                createdAt: new Date(1685825570941),
              },
              {
                author: {
                  avatarURL:
                    'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
                },
                message:
                  'Curtiu um comentário no servidor Narnia Roleplay “Melhor servidor que já joguei”',
                createdAt: new Date(1685825570941),
              },
              {
                author: {
                  avatarURL:
                    'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
                },
                message:
                  'Curtiu um comentário no servidor Narnia Roleplay “Melhor servidor que já joguei”',
                createdAt: new Date(1685825570941),
              },
              {
                author: {
                  avatarURL:
                    'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
                },
                message:
                  'Curtiu um comentário no servidor Narnia Roleplay “Melhor servidor que já joguei”',
                createdAt: new Date(1685825570941),
              },
              {
                author: {
                  avatarURL:
                    'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
                },
                message:
                  'Curtiu um comentário no servidor Narnia Roleplay “Melhor servidor que já joguei”',
                createdAt: new Date(1685825570941),
              },
              {
                author: {
                  avatarURL:
                    'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
                },
                message:
                  'Curtiu um comentário no servidor Narnia Roleplay “Melhor servidor que já joguei”',
                createdAt: new Date(1685825570941),
              },
              {
                author: {
                  avatarURL:
                    'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
                },
                message:
                  'Curtiu um comentário no servidor Narnia Roleplay “Melhor servidor que já joguei”',
                createdAt: new Date(1685825570941),
              },
            ]}
          />
        </InformationsSide>

        <InformationsSide>
          <Links
            title={'Conexões'}
            links={[
              { label: 'Github', url: 'https://github.com/combo0001' },
              { label: 'Twitch', url: 'https://github.com/combo0001' },
            ]}
          />

          <ServersMostPlayed
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
                hoursPlayed: 23,
                isOnline: true,
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
                hoursPlayed: 233,
                isOnline: false,
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
                hoursPlayed: 233,
                isOnline: false,
              },
            ]}
          />

          <LastServersPlayed
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
                hoursPlayed: 23,
                isOnline: true,
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
                hoursPlayed: 233,
                isOnline: false,
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
                hoursPlayed: 233,
                isOnline: false,
              },
            ]}
          />
        </InformationsSide>
      </InformationsWrapper>

      <Publications
        publications={[
          {
            author: {
              name: 'Willian',
              avatarURL:
                'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            },
            message:
              'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
            createdAt: new Date(1685825570941),
            likes: 23,
          },
          {
            author: {
              name: 'Willian',
              avatarURL:
                'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            },
            message:
              'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
            createdAt: new Date(1685825570941),
            likes: 23,
          },
          {
            author: {
              name: 'Willian',
              avatarURL:
                'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            },
            message:
              'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
            createdAt: new Date(1685825570941),
            likes: 23,
          },
          {
            author: {
              name: 'Willian',
              avatarURL:
                'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            },
            message:
              'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
            createdAt: new Date(1685825570941),
            likes: 23,
          },
          {
            author: {
              name: 'Willian',
              avatarURL:
                'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            },
            message:
              'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
            createdAt: new Date(1685825570941),
            likes: 23,
          },
          {
            author: {
              name: 'Willian',
              avatarURL:
                'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            },
            message:
              'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
            createdAt: new Date(1685825570941),
            likes: 23,
          },
          {
            author: {
              name: 'Willian',
              avatarURL:
                'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            },
            message:
              'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
            createdAt: new Date(1685825570941),
            likes: 23,
          },
          {
            author: {
              name: 'Willian',
              avatarURL:
                'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            },
            message:
              'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
            createdAt: new Date(1685825570941),
            likes: 23,
          },
          {
            author: {
              name: 'Willian',
              avatarURL:
                'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            },
            message:
              'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
            createdAt: new Date(1685825570941),
            likes: 23,
          },
        ]}
      />
    </ContentContainer>
  )
}
