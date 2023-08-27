/* eslint-disable no-undef */
import { styled } from '@/styles'
import { Heading, Text } from '@5list-design-system/react'

interface DescriptionProps {
  text: string
}

const DescriptionWrapper = styled('div', {
  minHeight: '10.75rem',

  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: '1fr',

  background: '$neutral800',
  borderRadius: '$lg',

  '& > *': {
    gridRow: 1,
    gridColumn: 1,
  },
})

const DescriptionContainer = styled('div', {
  padding: '$9 $6',

  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
})

export const Description = ({ text }: DescriptionProps): JSX.Element => {
  return (
    <DescriptionWrapper>
      <DescriptionContainer>
        <Heading as={'h5'} weight={'bold'}>
          Descrição
        </Heading>

        <Text size={'sm'}>{text}</Text>
      </DescriptionContainer>
    </DescriptionWrapper>
  )
}
