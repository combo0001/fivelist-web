/* eslint-disable no-undef */

import { styled } from '@/styles'
import { Heading, Text } from '@5list-design-system/react'

const TimePlayedContainer = styled('div', {
  height: '12.375rem',

  padding: '$6',

  display: 'flex',
  flexDirection: 'column',
  gap: '$6',

  border: '0.0625rem solid $neutral700',
  borderRadius: '$lg',
})

const InformationContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
})

const HoursPlayedText = styled('p', {
  fontFamily: '$alternative',
  fontWeight: 900,
  fontSize: '2.75rem',
  lineHeight: '2.5rem',

  color: '$success50',
})

export const TimePlayed = (): JSX.Element => {
  return (
    <TimePlayedContainer>
      <Heading as={'h4'} weight={'bold'}>
        Média de horas jogadas
      </Heading>

      <InformationContainer>
        <HoursPlayedText>5h 25m 53s</HoursPlayedText>

        <Text size={'sm'}>Resultado mensal com base nos jogdores ativos</Text>
      </InformationContainer>
    </TimePlayedContainer>
  )
}
