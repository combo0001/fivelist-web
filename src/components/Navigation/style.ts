import { styled } from '../../styles'

import Link from 'next/link'

export const NavigationContainer = styled('nav', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  paddingBottom: '$8',

  background: '$neutral800',
  borderRight: '0.0625rem solid $neutral700',

  '& > *:last-child': {
    marginTop: 'auto',
  }
})

export const LinkContainer = styled(Link, {
  textDecoration: 'none',

  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  padding: '0 $4',

  width: '100%',
  height: 'calc($16 + $2)',

  borderBottom: '0.0625rem solid $neutral700',
})

export const SelectContainer = styled('div', {
  width: '100%',

  padding: '0 $4',
})
