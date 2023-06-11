import { WorldIcon } from '@/components/Icons'
import { styled } from '@/styles'
import { Button, Heading, Text } from '@5list-design-system/react'
import { useState } from 'react'

import { AddLink, EditLink } from '../utils/Links'

/* eslint-disable no-undef */
interface WebsiteLinksProps {
  links: ServersType.WebsiteLinksObject[]
}

const WebsiteLinksContainer = styled('div', {
  minHeight: '13.875rem',

  padding: '$6',

  background: 'transparent',
  border: '0.0625rem solid $neutral800',
  borderRadius: '$lg',

  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
})

const TitleContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const WebsiteBox = styled('div', {
  textDecoration: 'none',

  cursor: 'pointer',

  display: 'flex',
  alignItems: 'center',
  gap: '$3',
})

export const WebsiteLinks = ({ links }: WebsiteLinksProps): JSX.Element => {
  const [isEditing, setEditing] = useState<boolean>(false)

  const toggleEditing = (): void => {
    setEditing((state) => !state)
  }

  return (
    <WebsiteLinksContainer>
      <TitleContainer>
        <Heading as={'h4'} weight={'bold'}>
          Links externos
        </Heading>

        <EditLink
          onClick={toggleEditing}
          text={isEditing ? 'Finalizar edição' : 'Editar links'}
        />
      </TitleContainer>

      {links.map(({ label }, index) => (
        <WebsiteBox key={index}>
          <Button variation={'icon'} size={'sm'}>
            <WorldIcon css={{ fill: '$white', size: '$6' }} />
          </Button>

          <Text size={'sm'} color={'$white'} weight={'bold'}>
            {label}
          </Text>
        </WebsiteBox>
      ))}

      {links.length === 0 || (isEditing && <AddLink text={'Adicionar site'} />)}
    </WebsiteLinksContainer>
  )
}
