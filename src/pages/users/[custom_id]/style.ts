import { styled } from '@/styles'

export const UsersContainer = styled('section', {
  maxHeight: '100%',

  display: 'flex',
  flexDirection: 'column',
  gap: '$10',
  alignItems: 'center',

  overflow: 'auto',
  scrollbarWidth: 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },

  '& > *': {
    flexShrink: 0,
  },
})
