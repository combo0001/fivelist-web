import { styled } from '@/styles'
import { Link } from '@5list-design-system/react'

export const LinkContainer = styled(Link, {
  userSelect: 'none',

  display: 'flex',
  alignItems: 'center',
  gap: '$1',

  '& > *:last-child': {
    fill: '$primary900',
  },

  '&:hover': {
    '& > *:last-child': {
      fill: '$primary800',
      transition: '200ms fill',
    },
  },
})
