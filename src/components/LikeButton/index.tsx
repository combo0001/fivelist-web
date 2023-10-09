/* eslint-disable no-undef */
import { styled } from '@/styles'
import { Text } from '@5list-design-system/react'
import { ComponentProps } from 'react'

import { LikeIcon, LikeOutlinedIcon } from '../Icons'

const LikeButtonContainer = styled('button', {
  border: 'none',
  cursor: 'pointer',

  width: '6.875rem',
  height: '$10',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$2',

  borderRadius: '$2xl',

  background: '$neutral800',

  '&:hover': {
    background: '$neutral700',
  },

  variants: {
    disabled: {
      true: {
        '& > *:first-child': {
          fill: '$neutral500',
        }, 

        opacity: 0.5,
        cursor: 'not-allowed',
      },
      false: {}
    }
  }
})

interface LikeButtonProps extends ComponentProps<typeof LikeButtonContainer> {
  reference?: any
  outlined?: boolean
}

export const LikeButton = ({
  children,
  outlined,
  reference,
  ...props
}: LikeButtonProps): JSX.Element => {
  return (
    <LikeButtonContainer ref={reference} {...props}>
      {outlined ? (
        <LikeOutlinedIcon css={{ size: '$6', fill: '$error500' }} />
      ) : (
        <LikeIcon css={{ size: '$6', fill: '$error500' }} />
      )}

      <Text size={'sm'} color={'$colors$white'}>
        {children}
      </Text>
    </LikeButtonContainer>
  )
}
