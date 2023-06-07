/* eslint-disable no-undef */

import { PencilIcon } from '@/components/Icons'
import { styled } from '@/styles'
import { Link } from '@5list-design-system/react'

interface EditLinkProps {
  text: string
}

const LinkContainer = styled(Link, {
  display: 'flex',
  alignItems: 'center',
  gap: '$1',

  [`${PencilIcon}`]: {
    size: '$4',
    fill: '$primary900',
  },

  '&:hover': {
    [`${PencilIcon}`]: {
      fill: '$primary800',
      transition: '200ms fill',
    },
  },
})

export const EditLink = ({ text }: EditLinkProps): JSX.Element => {
  return (
    <LinkContainer>
      {text}
      <PencilIcon />
    </LinkContainer>
  )
}
