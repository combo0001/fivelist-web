import { styled } from '@/styles'

export const DescriptionContainer = styled('section', {
  width: 'calc($80 + $10)',

  display: 'flex',
  flexDirection: 'column',
  gap: '$8',

  paddingBottom: '$10',
  borderBottom: '0.0625rem solid $colors$neutral700',
})
