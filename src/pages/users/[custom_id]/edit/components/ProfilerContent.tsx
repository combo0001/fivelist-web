import { styled } from '@/styles'

/* eslint-disable no-undef */
import { Description } from './Description'
import { SocialMediaLinks } from './SocialMedia'
import { StreamLink } from './StreamLink'
import { useUserEditor } from '../providers/UserEditorProvider'
import { trpc } from '@/utils/trpc'
import { SocialMediaSchemaType } from '@/@types/schemas/SocialMediaSchema'

interface ProfileHeaderProps {}

const ContentContainer = styled('section', {
  width: '100%',

  padding: '0 $8 $8 $8',

  display: 'grid',
  flexDirection: 'column',
  gap: '$8',
})

const InformationsWrapper = styled('div', {
  display: 'flex',
  gap: '$8',

  '& > *': {
    width: 'calc(50% - $8 / 2)',
  },
})

const InformationsSide = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$8',
})

export const ProfileContent = ({}: ProfileHeaderProps): JSX.Element => {
  const { user, refreshUser } = useUserEditor()

  const setUserStreamLink = trpc.users.setUserStreamLink.useMutation()
  const addUserSocialMedia = trpc.users.addUserSocialMedia.useMutation()
  const removeUserSocialMedia = trpc.users.removeUserSocialMedia.useMutation()

  const handleOnStreamLinkChange = async (streamURL: string): Promise<void> => {
    await setUserStreamLink.mutateAsync({ streamURL })

    await refreshUser()
  }

  const handleOnAddSocialMedia = async (socialMedia: SocialMediaSchemaType, profileId: string): Promise<void> => {
    await addUserSocialMedia.mutateAsync({ socialMedia, profileId })

    await refreshUser()
  } 

  const handleOnRemoveSocialMedia = async (socialMedia: SocialMediaSchemaType): Promise<void> => {
    await removeUserSocialMedia.mutateAsync({ socialMedia })

    await refreshUser()
  } 

  return (
    <ContentContainer>
      <Description
        hasVip={user.planTier.privileges.PROFILE_DESCRIPTION}
        text={user.page.description || 'Descrição não foi criada.'}
      />

      <InformationsWrapper>
        <InformationsSide>
          <SocialMediaLinks
            socialMedia={user.page.socialMedia}
            onAddSocialMedia={handleOnAddSocialMedia}
            onRemoveSocialMedia={handleOnRemoveSocialMedia}
          />

          <StreamLink streamURL={user.page.streamURL || ''} onChange={handleOnStreamLinkChange} />
        </InformationsSide>

        <InformationsSide>
        </InformationsSide>
      </InformationsWrapper>
    </ContentContainer>
  )
}
