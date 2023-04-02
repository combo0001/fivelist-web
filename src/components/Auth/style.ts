import { styled } from '../../styles'

export const Background = styled('main', {
  width: '100vw',
  height: '100vh',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  backgroundColor: '$neutral900',
  overflow: 'hidden',

  '> *:not(:first-child)': {
    zIndex: 1,
  },
})

export const Container = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',

  maxWidth: '100%',
})
