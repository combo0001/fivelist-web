/* eslint-disable no-undef */
import { styled } from '@/styles'
import { Heading, Link, Text } from '@5list-design-system/react'
import NextLink from 'next/link'

interface StatisticProps {
  cfxHash: string
  likes: {
    amount: number
    variation: number
  }
  followers: {
    amount: number
    variation: number
  }
  hasVip: boolean
}

const StatisticContainer = styled('div', {
  height: '$50',

  padding: '$6',

  background: '$neutral800',
  borderRadius: '$lg',

  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
})

const TitleContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const StatisticsContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$8',
})

const StatisticBox = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
})

const StatisticDataText = styled('p', {
  fontFamily: '$alternative',
  fontWeight: '$bold',
  fontSize: '$3xl',

  lineHeight: '$space$10',

  color: '$white',

  display: 'flex',
  alignItems: 'center',
  gap: '$1',
})

export const Statistic = ({
  cfxHash,
  followers,
  likes,
  hasVip,
}: StatisticProps): JSX.Element => {
  return (
    <StatisticContainer>
      <TitleContainer>
        <Heading as={'h4'} weight={'bold'}>
          {hasVip ? 'Estatísticas básicas' : 'Estatísticas'}
        </Heading>

        {hasVip ? (
          <NextLink href={`/servers/${cfxHash}/analytics`} legacyBehavior>
            <Link as={'span'} css={{ fontSize: '$sm' }}>
              Estatísticas avançadas
            </Link>
          </NextLink>
        ) : (
          <Link disabled as={'span'} css={{ fontSize: '$sm' }}>
            Estatísticas avançadas (premium)
          </Link>
        )}
      </TitleContainer>

      <StatisticsContainer>
        <StatisticBox>
          <StatisticDataText>
            {likes.amount.toLocaleString()}
            <Text
              as={'span'}
              size={'sm'}
              color={likes.variation >= 0 ? '$success500' : '$error500'}
            >
              {likes.variation >= 0 ? '+' : '-'}
              {likes.variation}%
            </Text>
          </StatisticDataText>

          <Text size={'sm'}>Curtidas (mês)</Text>
        </StatisticBox>

        <StatisticBox>
          <StatisticDataText>
            {followers.amount.toLocaleString()}
            <Text
              as={'span'}
              size={'sm'}
              color={followers.variation >= 0 ? '$success500' : '$error500'}
            >
              {followers.variation >= 0 ? '+' : '-'}
              {followers.variation}%
            </Text>
          </StatisticDataText>

          <Text size={'sm'}>Seguidores (mês)</Text>
        </StatisticBox>
      </StatisticsContainer>
    </StatisticContainer>
  )
}
