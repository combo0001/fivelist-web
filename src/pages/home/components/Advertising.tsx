/* eslint-disable no-undef */

import { styled } from '@/styles'

const AdvertisingContainer = styled('div', {
  width: '100%',
  height: '5.625rem',

  background: '$neutral800',
  borderRadius: '$lg',
})

export const Advertising = (): JSX.Element => {
  return <AdvertisingContainer></AdvertisingContainer>
}
