/* eslint-disable no-undef */
import { styled } from '@/styles'

import { ActivePlayers } from './ActivePlayers'
import { PageClicks } from './PageClicks'
import { PageFollowers } from './PageFollowers'
import { PageLikes } from './PageLikes'
import { PageViews } from './PageViews'
import { ServerAccesses } from './ServerAccesses'
import { Streamers } from './Streamers'
import { TimePlayed } from './TimePlayed'
import { VotedPlayers } from './VotedPlayers'

const ContentContainer = styled('section', {
  paddingTop: '$10',
  paddingBottom: '5.125rem',

  width: '94.5%',

  display: 'flex',
  gap: '$8',
})

const SectionLayout = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$8',

  height: 'fit-content',
})

const LargerSection = styled(SectionLayout, {
  width: '63.5%',
})

const SmallSection = styled(SectionLayout, {
  width: '36.5%',
})

export const ServerContent = (): JSX.Element => {
  const MOCK_PLAYERS = [
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
  ]

  return (
    <ContentContainer>
      <LargerSection>
        <PageViews />

        <ServerAccesses />

        <PageFollowers />

        <PageClicks />
      </LargerSection>

      <SmallSection>
        <TimePlayed />

        <ActivePlayers players={MOCK_PLAYERS} />

        <VotedPlayers players={MOCK_PLAYERS} />

        <PageLikes />

        <Streamers players={MOCK_PLAYERS} />
      </SmallSection>
    </ContentContainer>
  )
}
