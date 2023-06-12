import { styled } from '@/styles'
import { getPlatformIcon } from '@/components/Platforms'
import { Heading, Text } from '@5list-design-system/react'
import { useState } from 'react'

import { AddLink, EditLink } from '../utils/Links'

/* eslint-disable no-undef */
interface SocialMediaProps {
  links: ServersType.SocialMediaLinksObject[]
}

const SocialMediaContainer = styled('div', {
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

const SocialLinksContainer = styled('ul', {
  width: '100%',

  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  '& > *': {
    listStyleType: 'none',
  },
})

const SocialMediaLinkBox = styled('li', {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
})

export const SocialMedia = ({ links }: SocialMediaProps): JSX.Element => {
  const [isEditing, setEditing] = useState<boolean>(false)

  const toggleEditing = (): void => {
    setEditing((state) => !state)
  }

  return (
    <SocialMediaContainer>
      <TitleContainer>
        <Heading as={'h4'} weight={'bold'}>
          Redes sociais
        </Heading>

        <EditLink
          onClick={toggleEditing}
          text={isEditing ? 'Finalizar edição' : 'Editar links'}
        />
      </TitleContainer>

      <SocialLinksContainer>
        {links.map(({ platform, userId }, index) => {
          console.log(platform)
          return (
            <SocialMediaLinkBox css={{ userSelect: 'none' }} key={index}>
              {getPlatformIcon(platform)}

              <Text size={'sm'} color={'$white'} weight={'bold'}>
                @{userId}
              </Text>
            </SocialMediaLinkBox>
          )
        })}

        {links.length === 0 ||
          (isEditing && <AddLink text={'Adicionar rede social'} />)}
      </SocialLinksContainer>
    </SocialMediaContainer>
  )
}
