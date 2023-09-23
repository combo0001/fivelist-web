import { getPlatformIcon } from '@/components/Platforms'
import { ServerSocialMediaListSchemaType } from '@/schemas/servers/SocialMediaSchema'
import { styled } from '@/styles'
import { Heading, Text } from '@5list-design-system/react'

/* eslint-disable no-undef */
interface SocialMediaProps {
  socialMedia: ServerSocialMediaListSchemaType
}

const SocialMediaContainer = styled('div', {
  minHeight: 'fit-content',

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

export const SocialMedia = ({ socialMedia }: SocialMediaProps): JSX.Element => {
  return (
    <SocialMediaContainer>
      <Heading as={'h4'} weight={'bold'}>
        Redes sociais
      </Heading>

      <SocialLinksContainer>
        {
          socialMedia.length ?
            socialMedia.map(({ socialMedia, profileId }, index) => {
              return (
                <SocialMediaLinkBox key={index}>
                  {getPlatformIcon(socialMedia)}
    
                  <Text size={'sm'} color={'$white'} weight={'bold'}>
                    @{profileId}
                  </Text>
                </SocialMediaLinkBox>
              )
            })
          : <Text>
            Nenhuma rede social adicionada.
          </Text>
        }
      </SocialLinksContainer>
    </SocialMediaContainer>
  )
}
