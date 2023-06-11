/* eslint-disable no-undef */

import { AddIcon, PencilIcon } from '@/components/Icons'
import { styled } from '@/styles'
import { Link } from '@5list-design-system/react'
import { ComponentProps } from 'react'

const LinkContainer = styled(Link, {
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

interface LinkProps extends ComponentProps<typeof LinkContainer> {
  text: string
}

export const EditLink = ({ text, ...props }: LinkProps): JSX.Element => {
  return (
    <LinkContainer css={{ fontSize: '$xs' }} {...props}>
      {text}
      <PencilIcon css={{ size: '$4' }} />
    </LinkContainer>
  )
}

export const AddLink = ({ text, ...props }: LinkProps): JSX.Element => {
  return (
    <LinkContainer {...props}>
      <AddIcon css={{ size: '$10' }} />
      {text}
    </LinkContainer>
  )
}
