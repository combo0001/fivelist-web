import { styled } from '@/styles'

export const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$8',
})

export const InputsContainer = styled('div', {
  minWidth: 'calc($80 + $10)',

  paddingBottom: '$10',
  borderBottom: '0.0625rem solid $colors$neutral700',

  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
})

export const CheckContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  userSelect: 'none',
})

export const ButtonsContainer = styled('div', {
  display: 'flex',
  gap: '$4',
})
