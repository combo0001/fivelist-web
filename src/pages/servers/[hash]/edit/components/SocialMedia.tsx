/* eslint-disable no-undef */
import { LinkDialog } from '@/components/Dialogs/Link'
import { AddLink } from '@/components/EditLinks'
import { getPlatformIcon } from '@/components/Platforms'
import { styled } from '@/styles'
import { Heading, Text } from '@5list-design-system/react'

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
  return (
    <SocialMediaContainer>
      <Heading as={'h4'} weight={'bold'}>
        Redes sociais
      </Heading>

      <SocialLinksContainer>
        {links.map(({ platform, userId }, index) => {
          return (
            <SocialMediaLinkBox css={{ userSelect: 'none' }} key={index}>
              {getPlatformIcon(platform)}

              <Text size={'sm'} color={'$white'} weight={'bold'}>
                @{userId}
              </Text>
            </SocialMediaLinkBox>
          )
        })}

        <LinkDialog
          title={'Adicionar rede social'}
          trigger={<AddLink text={'Adicionar rede social'} />}
        />
      </SocialLinksContainer>
    </SocialMediaContainer>
  )
}
