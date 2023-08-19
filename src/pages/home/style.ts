import { styled } from '../../styles'

export const ListContainer = styled('section', {
  width: '100%',

  minHeight: '100%',
  maxHeight: '100%',

  display: 'flex',
  flexDirection: 'column',

  overflow: 'scroll',
  scrollbarWidth: 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },

  '& > *': {
    flexShrink: 0,
  },
})
