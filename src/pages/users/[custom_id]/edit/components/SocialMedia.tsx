import { SocialMediaSchemaType } from '@/schemas/SocialMediaSchema'
import { UserSocialMediaListSchemaType } from '@/schemas/users/SocialMediaSchema'
import { RestrictLinkDialog } from '@/components/Dialogs/RestrictLink'
import { AddLink } from '@/components/EditLinks'
import { WorldIcon } from '@/components/Icons'
import { styled } from '@/styles'
import {
  getAvailableSocialMedia,
  getSocialMediaLink,
} from '@/utils/socialMediaLinks'
import { Button, Heading, Text } from '@5list-design-system/react'
import { useTranslation } from 'react-i18next'

/* eslint-disable no-undef */
interface SocialMediaProps {
  socialMedia: UserSocialMediaListSchemaType
  onAddSocialMedia: (
    socialMedia: SocialMediaSchemaType,
    profileId: string,
  ) => Promise<void> | void
  onRemoveSocialMedia: (
    vsocialMedia: SocialMediaSchemaType,
  ) => Promise<void> | void
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

const SocialMediaList = styled('ul', {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '$4',

  '& > *': {
    flex: '1 0 34%',
    listStyleType: 'none',
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
  onAddSocialMedia,
  onRemoveSocialMedia,
}: SocialMediaProps): JSX.Element => {
  const { t } = useTranslation('pages')
  const availableSocialMedia = getAvailableSocialMedia()

  const handleOnChange = async (
    option: string,
    text: string,
  ): Promise<void> => {
    const socialMedia = option as SocialMediaSchemaType

    if (text) {
      if (/\s/.test(text) && text.length > 64) return

      await onAddSocialMedia(socialMedia, text)
    } else {
      await onRemoveSocialMedia(socialMedia)
    }
  }

  return (
    <SocialMediaContainer>
      <Heading as={'h4'} weight={'bold'}>
        {t('usersPageEdit.socialMediaSection.title')}
      </Heading>

      <SocialMediaList>
        {socialMedia.map(({ socialMedia, profileId }) => {
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
        })}

        <RestrictLinkDialog
          title={t('usersPageEdit.socialMediaSection.addSocialMedia')}
          placeHolder={'Digite o usuário do perfil'}
          options={availableSocialMedia.map((value) => {
            return {
              label: value[0] + value.substring(1).toLowerCase(),
              value,
            }
          })}
          onSave={handleOnChange}
          trigger={
            <AddLink
              text={t('usersPageEdit.socialMediaSection.addSocialMedia')}
            />
          }
        />
      </SocialMediaList>
    </SocialMediaContainer>
  )
}
