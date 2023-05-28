import { styled } from '../../styles'

export const HomeContainer = styled('main', {
  width: '100vw',
  height: '100vh',

  display: 'grid',
  gridTemplateColumns: '$space$60 1fr',
  gridTemplateRows: '$space$20 1fr',

  overflow: 'hidden',

  '& > *:nth-child(1)': {
    gridArea: '1 / 1 / 2 / 3',
  },

  '& > *:nth-child(2)': {
    gridArea: '2 / 1 / 3 / 2',
  },

  '& > *:nth-child(3)': {
    gridArea: '2 / 2 / 3 / 3',
  },
})

export const ListContainer = styled('section', {
  width: '100%',
  height: '100%',

  overflow: 'hidden',

  display: 'flex',
  flexDirection: 'column',
})
