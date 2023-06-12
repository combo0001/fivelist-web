/* eslint-disable no-undef */

import { styled } from '@/styles'
import { Heading, Select, Text } from '@5list-design-system/react'

const PageViewsContainer = styled('div', {
  height: '12.375rem',

  padding: '$6',

  display: 'flex',
  flexDirection: 'column',
  gap: '$6',

  border: '0.0625rem solid $neutral700',
  borderRadius: '$lg',
})

const TitleContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  height: '$10',
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
      <TitleContainer>
        <Heading as={'h4'} weight={'bold'}>
          Visualizações do servidor
        </Heading>

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
          outlined={false}
        />
      </TitleContainer>

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
    </PageViewsContainer>
  )
}
