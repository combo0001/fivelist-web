/* eslint-disable no-undef */
import { styled } from '@/styles'

import { useServer } from '../../providers/ServerProvider'
import { Description } from './Description'

const ContentContainer = styled('section', {
  width: '94.5%',

  display: 'grid',
  gridTemplateRows: 'auto auto auto auto',
  gridTemplateColumns: '1fr 1fr',
  gridGap: '$8',

  paddingBottom: '5.125rem',

  '& > *:nth-child(1)': {
    gridArea: '1 / 1 / 2 / 3',
  },

  '& > *:nth-child(2)': {
    gridArea: '2 / 1 / 3 / 2',
  },

  '& > *:nth-child(3)': {
    gridArea: '2 / 2 / 3 / 3',
  },

  '& > *:nth-child(4)': {
    gridArea: '3 / 1 / 4 / 2',
  },

  '& > *:nth-child(5)': {
    gridArea: '3 / 2 / 4 / 3',
  },

  '& > *:nth-child(6)': {
    gridArea: '4 / 1 / 5 / 3',
  },
})

export const ServerContent = (): JSX.Element => {
  const { description, hasVip } = useServer()

  return (
    <ContentContainer>
      <Description text={description} hasVip={hasVip} />
    </ContentContainer>
  )
}
