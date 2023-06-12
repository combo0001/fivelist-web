/* eslint-disable no-undef */

import { styled } from '@/styles'
import { Heading, Select } from '@5list-design-system/react'
import dynamic from 'next/dynamic'
import { Props as ChartProps } from 'react-apexcharts'

import { chartOptions } from '../utils/LineChartOptions'

const Chart = dynamic<ChartProps>(() => import('react-apexcharts'), {
  ssr: false,
})

const ServerAccessesContainer = styled('div', {
  height: '26.75rem',

  padding: '$6',

  display: 'flex',
  flexDirection: 'column',
  gap: '$6',

  border: '0.0625rem solid $neutral700',
  borderRadius: '$lg',

  [`& > ${Chart}`]: {
    flex: 1,
  },
})

const TitleContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  height: '$10',
})

export const ServerAccesses = (): JSX.Element => {
  const MOCK_DATA = [
    {
      x: new Date('2018-02-12').getTime(),
      y: 23,
    },
    {
      x: new Date('2018-02-13').getTime(),
      y: 44,
    },
    {
      x: new Date('2018-02-14').getTime(),
      y: 76,
    },
    {
      x: new Date('2018-02-15').getTime(),
      y: 155,
    },
    {
      x: new Date('2018-02-16').getTime(),
      y: 22,
    },
    {
      x: new Date('2018-02-17').getTime(),
      y: 33,
    },
    {
      x: new Date('2018-02-18').getTime(),
      y: 23,
    },
    {
      x: new Date('2018-02-19').getTime(),
      y: 54,
    },
    {
      x: new Date('2018-02-20').getTime(),
      y: 65,
    },
    {
      x: new Date('2018-02-21').getTime(),
      y: 44,
    },
  ]

  const chartConfig: ChartProps = {
    options: {
      ...chartOptions,
    },
    series: [
      {
        data: MOCK_DATA,
      },
    ],
    height: 316,
    type: 'line',
  }

  return (
    <ServerAccessesContainer>
      <TitleContainer>
        <Heading as={'h4'} weight={'bold'}>
          Acessos ao servidor
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

      <Chart {...chartConfig} />
    </ServerAccessesContainer>
  )
}
