/* eslint-disable no-undef */

import { AddIcon, PencilIcon } from '@/components/Icons'
import { ComponentProps } from 'react'

import { LinkContainer } from './style'

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
