import { styled } from '../../styles'

export const ListContainer = styled('section', {
  width: '100%',
  height: '100%',

  display: 'flex',
  flexDirection: 'column',

  '& > *': {
    flexShrink: 0,
  },
})
