import { UserSocialMediaListSchemaType } from '@/schemas/users/SocialMediaSchema'
import { WorldIcon } from '@/components/Icons'
import { styled } from '@/styles'
import { getSocialMediaLink } from '@/utils/socialMediaLinks'
import { Button, Heading, Text } from '@5list-design-system/react'

/* eslint-disable no-undef */
interface SocialMediaProps {
  socialMedia: UserSocialMediaListSchemaType
}

const SocialMediaContainer = styled('div', {
  minHeight: '9.25rem',

  padding: '$6',

  background: 'transparent',
  border: '0.0625rem solid $neutral800',
  borderRadius: '$lg',

  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
})

const WebsiteSocialMediaContainer = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '$4',

  '& > *': {
    flex: '1 0 34%',
  },
})

const WebsiteLinkBox = styled('a', {
  textDecoration: 'none',

  cursor: 'pointer',

  display: 'flex',
  alignItems: 'center',
  gap: '$3',
})

export const SocialMediaLinks = ({
  socialMedia,
}: SocialMediaProps): JSX.Element => {
  return (
    <SocialMediaContainer>
      <Heading as={'h4'} weight={'bold'}>
        Redes sociais
      </Heading>

      <WebsiteSocialMediaContainer>
        {socialMedia.length ? 
          socialMedia.map(({ socialMedia, profileId }) => {
            const socialMediaURL = getSocialMediaLink(socialMedia, profileId)

            return (
              <WebsiteLinkBox
                href={socialMediaURL}
                target={'_blank'}
                key={socialMedia}
              >
                <Button variation={'icon'} size={'sm'}>
                  <WorldIcon css={{ fill: '$white', size: '$6' }} />
                </Button>

                <Text
                  size={'sm'}
                  color={'$white'}
                  weight={'bold'}
                  css={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                >
                  {socialMedia[0] + socialMedia.substring(1).toLowerCase()}
                </Text>
              </WebsiteLinkBox>
            )
          })
          : <Text>
            Nenhuma rede social registrada.
          </Text>
        }
      </WebsiteSocialMediaContainer>
    </SocialMediaContainer>
  )
}
