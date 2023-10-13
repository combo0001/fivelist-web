import { styled } from '@/styles'

export const CheckoutWrapper = styled('section', {
  justifySelf: 'center',

  paddingTop: '$6',

  gridColumn: '1 / 3 !important',
  maxHeight: '100%',

  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  gridTemplateColumns: '27.375rem 46.625rem',
  gridGap: '$6 $8',
})
