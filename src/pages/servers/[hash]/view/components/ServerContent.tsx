/* eslint-disable no-undef */
import { styled } from '@/styles'

// import { useServer } from '../providers/ServerProvider'

const ContentContainer = styled('section', {
  width: '71rem',

  display: 'grid',
  gridTemplateRows: '11.25rem 13.875rem 27.125rem auto',
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

const DescriptionContainer = styled('div', {})

const StatisticContainer = styled('div', {})

const LinksContainer = styled('div', {})

const SocialMediaContainer = styled('div', {})

const StreamersContainer = styled('div', {})

const ReviewsContainer = styled('div', {})

const PlayersContainer = styled('div', {})

export const ServerContent = (): JSX.Element => {
  return (
    <ContentContainer>
      <DescriptionContainer></DescriptionContainer>

      <StatisticContainer></StatisticContainer>

      <LinksContainer></LinksContainer>

      <SocialMediaContainer></SocialMediaContainer>

      <StreamersContainer></StreamersContainer>

      <ReviewsContainer></ReviewsContainer>

      <PlayersContainer></PlayersContainer>
    </ContentContainer>
  )
}
