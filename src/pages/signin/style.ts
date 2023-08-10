import { styled } from '@/styles'

export const Form = styled('form', {
  width: 'calc($80 + $10)',

  paddingBottom: '$8',
  borderBottom: '0.0625rem solid $colors$neutral700',

  display: 'flex',
  flexDirection: 'column',
  gap: '$8',
})

export const InputsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
})
