import { styled } from '@/styles'
import { Heading, Text } from '@5list-design-system/react'
import Image from 'next/image'
import ScrollContainer from 'react-indiana-drag-scroll'

/* eslint-disable no-undef */
interface StreamersProps {
  streamers: ServersType.StreamerLiveObject[]
}

const StreamersContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
})

const StreamersList = styled(ScrollContainer, {
  flex: 1,

  display: 'flex',
  alignItems: 'center',
  gap: '$3',

  overflowY: 'hidden',
  overflowX: 'auto',

  paddingBottom: '$2',

  '&::-webkit-scrollbar': {
    height: '$1',
  },

  '&::-webkit-scrollbar-track': {
    background: '$neutral800',
    borderRadius: '$md',
  },

  '&::-webkit-scrollbar-thumb': {
    background: '$neutral400',
    borderRadius: '$md',
  },

  '&::-webkit-scrollbar-thumb:hover': {
    background: '$neutral300',
  },
})

const StreamerLiveBox = styled('div', {
  flexShrink: 0,

  width: '17rem',
  height: '24.125rem',

  background: '$neutral800',
  borderRadius: '$lg',

  display: 'flex',
  flexDirection: 'column',
})

const LiveBannerImage = styled(Image, {
  width: '100%',
  height: '16.75rem',
})

const LiveInformationsBox = styled('div', {
  height: '5.125rem',

  padding: '0 $4',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '$2',
})

const LiveInformationText = styled(Text, {
  maxWidth: '100%',
  whiteSpace: 'nowrap',

  textOverflow: 'ellipsis',
})

const LiveViewersBox = styled('div', {
  height: '$9',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$2',

  background: '$neutral700',

  '&::before': {
    content: '',
    display: 'inline-block',

    background: '$success400',
    size: '$2',
    borderRadius: '$full',
  },
})

export const Streamers = ({ streamers }: StreamersProps): JSX.Element => {
  const viewersToLabel = (viewers: number) => {
    if (viewers < 1000) {
      return viewers
    }

    const si = [
      { v: 1e3, s: 'K' },
      { v: 1e6, s: 'M' },
      { v: 1e9, s: 'B' },
      { v: 1e12, s: 'T' },
      { v: 1e15, s: 'P' },
      { v: 1e18, s: 'E' },
    ]

    let indexToDecimalCase

    for (
      indexToDecimalCase = si.length - 1;
      indexToDecimalCase > 0;
      indexToDecimalCase--
    ) {
      if (viewers >= si[indexToDecimalCase].v) {
        break
      }
    }

    return (
      (viewers / si[indexToDecimalCase].v)
        .toFixed(2)
        .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[indexToDecimalCase].s
    )
  }

  return (
    <StreamersContainer>
      <Heading as={'h5'} weight={'bold'}>
        Streamers Online
      </Heading>

      <StreamersList vertical={false} hideScrollbars={false}>
        {streamers.map(({ title, streamer, viewers, bannerURL }, index) => (
          <StreamerLiveBox key={index}>
            <LiveBannerImage
              src={bannerURL}
              alt={'Banner of server'}
              width={274}
              height={270}
            />

            <LiveInformationsBox>
              <LiveInformationText color={'$white'} size={'sm'} weight={'bold'}>
                {title}
              </LiveInformationText>

              <LiveInformationText size={'xs'}>{streamer}</LiveInformationText>
            </LiveInformationsBox>

            <LiveViewersBox>
              <Text size={'xs'} weight={'bold'}>
                {viewersToLabel(viewers)} viewers
              </Text>
            </LiveViewersBox>
          </StreamerLiveBox>
        ))}
      </StreamersList>
    </StreamersContainer>
  )
}
