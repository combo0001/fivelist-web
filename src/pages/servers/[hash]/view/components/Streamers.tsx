import { styled } from '@/styles'
import { Heading, Text } from '@5list-design-system/react'
import Image from 'next/image'

/* eslint-disable no-undef */
interface StreamersProps {
  streamers: ServersType.StreamerLiveObject[]
}

const StreamersContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
})

const StreamersList = styled('section', {
  flex: 1,

  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridTemplateRows: '1fr',
  gridGap: '$3',

  '& > *': {
    listStyleType: 'none',
  },
})

const StreamerLiveBox = styled('div', {
  background: '$neutral800',
  borderRadius: '$lg',

  overflow: 'hidden',

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
  overflow: 'hidden',
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
        Streamer Online
      </Heading>

      <StreamersList>
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
