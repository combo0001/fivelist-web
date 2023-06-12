/* eslint-disable no-undef */

import { styled } from '@/styles'
import { Heading } from '@5list-design-system/react'
import dynamic from 'next/dynamic'
import { Props as ChartProps } from 'react-apexcharts'

import { chartOptions } from '../utils/BarChartOptions'

const Chart = dynamic<ChartProps>(() => import('react-apexcharts'), {
  ssr: false,
})

const PageClicksContainer = styled('div', {
  height: '29.375rem',

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

export const PageClicks = (): JSX.Element => {
  const MOCK_DATA = [
    {
      x: 'Discord',
      y: 10,
    },
    {
      x: 'Site',
      y: 18,
    },
    {
      x: 'Loja',
      y: 13,
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
    height: 370,
    type: 'bar',
  }

  return (
    <PageClicksContainer>
      <Heading as={'h4'} weight={'bold'}>
        Seguidores
      </Heading>

      <Chart {...chartConfig} />
    </PageClicksContainer>
  )
}
