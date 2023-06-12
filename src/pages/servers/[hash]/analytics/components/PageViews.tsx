/* eslint-disable no-undef */

import { styled } from '@/styles'
import { Heading, Select, Text } from '@5list-design-system/react'

const PageViewsContainer = styled('div', {
  height: '12.375rem',

  padding: '$6',

  display: 'grid',
  gridTemplateRows: '$space$10 1fr',
  gridTemplateColumns: '1fr $space$40',
  gridGap: '$6 0',

  border: '0.0625rem solid $neutral700',
  borderRadius: '$lg',

  '& > *:nth-child(1)': {
    gridArea: '1 / 1 / 2 / 2',
  },

  '& > *:nth-child(2)': {
    gridArea: '2 / 1 / 3 / 2',
  },

  '& > *:nth-child(3)': {
    gridArea: '1 / 2 / 3 / 3',

    '*': {
      borderRadius: '1.25rem',
      color: '$primary900',
      fill: '$primary900',
    },
  },
})

const InformationContainer = styled('div', {
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

export const PageViews = (): JSX.Element => {
  const DATA = 1233
  const VARIATION = 23

  return (
    <PageViewsContainer>
      <Heading as={'h4'} weight={'bold'}>
        Visualizações do servidor
      </Heading>

      <InformationContainer>
        <StatisticDataText>
          {DATA.toLocaleString()}
          <Text
            as={'span'}
            size={'sm'}
            color={VARIATION >= 0 ? '$success500' : '$error500'}
          >
            {VARIATION >= 0 ? '+' : '-'}
            {VARIATION}%
          </Text>
        </StatisticDataText>

        <Text size={'sm'}>Aumento em relação ao dia anterior</Text>
      </InformationContainer>

      <Select
        options={[
          {
            label: '12/10/2023',
            value: '1702177200000',
          },
        ]}
        defaultValue={'1702177200000'}
        width={'$40'}
        height={'$10'}
        outlined
      />
    </PageViewsContainer>
  )
}
