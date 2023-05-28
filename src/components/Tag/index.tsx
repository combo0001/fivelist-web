/* eslint-disable no-undef */
import { styled } from '@/styles'
import { Text } from '@5list-design-system/react'
import { ComponentProps } from 'react'

export const TagBox = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  height: '$6',
  padding: '0 $2',

  background: '$neutral800',
  borderRadius: '$lg',

  variants: {
    active: {
      true: {
        '&::before': {
          content: '',
          display: 'inline-block',

          background: '$success600',

          size: '$2',
          borderRadius: '$full',
        },
      },
      false: {},
    },
  },

  defaultVariants: {
    active: true,
  },
})

interface TagProps extends ComponentProps<typeof TagBox> {
  active?: boolean
}

export const Tag = ({ children, ...props }: TagProps): JSX.Element => {
  return (
    <TagBox {...props}>
      <Text size={'xs'} weight={'bold'}>
        {children}
      </Text>
    </TagBox>
  )
}
