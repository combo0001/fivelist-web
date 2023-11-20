import { Heading, Text } from '@5list-design-system/react'
import { styled } from '@/styles'
import { useTranslation } from 'react-i18next'

/* eslint-disable no-undef */
interface StatisticProps {
  players: number
}

const StatisticContainer = styled('div', {
  height: '11.25rem',

  padding: '$9 $6',

  background: '$neutral800',
  borderRadius: '$lg',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

const PlayersText = styled('p', {
  fontFamily: '$alternative',
  fontWeight: '$bold',
  fontSize: '$3xl',

  lineHeight: '$space$10',

  color: '$white',
})

export const Statistic = ({ players }: StatisticProps): JSX.Element => {
  const { t } = useTranslation('pages')
  
  return (
    <StatisticContainer>
      <Heading as={'h5'} weight={'bold'}>
        {t('serversPage.statisticsSection.title')}
      </Heading>

      <PlayersText>{players.toLocaleString()}</PlayersText>

      <Text size={'sm'}>{t('serversPage.statisticsSection.playersInLast24Hours')}</Text>
    </StatisticContainer>
  )
}
