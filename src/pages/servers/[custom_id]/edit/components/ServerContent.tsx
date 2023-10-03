/* eslint-disable no-undef */
import { styled } from '@/styles'

import { Description } from './Description'
import { SocialMediaLinks } from './SocialMediaLinks'
import { Statistic } from './Statistic'
import { WebsiteLinks } from './WebsiteLinks'
import { CustomLink } from './CustomLink'
import { Players } from './Players'
import { useServerEditor } from '../providers/ServerEditorProvider'
import { ServerDynamicSchemaType } from '@/schemas/servers/DynamicSchema'
import { trpc } from '@/utils/trpc'
import { SocialMediaSchemaType } from '@/schemas/SocialMediaSchema'

const ContentContainer = styled('section', {
  width: '94.5%',

  display: 'grid',
  gridTemplateRows: 'auto auto auto auto',
  gridTemplateColumns: '1fr 1fr',
  gridGap: '$8',

  paddingBottom: '5.125rem',

  '& > *:nth-child(1)': {
    gridArea: '1 / 1 / 2 / 3',
  },

  '& > *:nth-child(2)': {
    gridArea: '2 / 1 / 3 / 2',
  },

  '& > *:nth-child(3)': {
    gridArea: '2 / 2 / 3 / 3',
  },

  '& > *:nth-child(4)': {
    gridArea: '3 / 1 / 4 / 2',
  },

  '& > *:nth-child(5)': {
    gridArea: '3 / 2 / 4 / 3',
  },

  '& > *:nth-child(6)': {
    gridArea: '4 / 1 / 5 / 3',
  },
})

export const ServerContent = (): JSX.Element => {
  const { serverDynamic: serverDynamicNullable, serverToEdit, refreshServer } = useServerEditor()
  const serverDynamic = serverDynamicNullable as ServerDynamicSchemaType

  const description = serverToEdit.page.description || 'Descrição não foi alterada'

  const addServerSocialMedia = trpc.servers.addServerSocialMedia.useMutation()
  const removeServerSocialMedia = trpc.servers.removeServerSocialMedia.useMutation()

  const addServerLink = trpc.servers.addServerLink.useMutation()
  const removeServerLink = trpc.servers.removeServerLink.useMutation()

  const handleOnAddSocialMedia = async (
    socialMedia: SocialMediaSchemaType,
    profileId: string,
  ): Promise<void> => {
    await addServerSocialMedia.mutateAsync({ 
      pageId: serverToEdit.page.id,
      joinId: serverToEdit.joinId,
      socialMedia, 
      profileId 
    })

    await refreshServer()
  }

  const handleOnRemoveSocialMedia = async (
    socialMedia: SocialMediaSchemaType,
  ): Promise<void> => {
    await removeServerSocialMedia.mutateAsync({ 
      pageId: serverToEdit.page.id,
      joinId: serverToEdit.joinId,
      socialMedia 
    })

    await refreshServer()
  }

  const handleOnAddLink = async (
    name: string,
    redirectURL: string,
  ): Promise<void> => {
    await addServerLink.mutateAsync({ 
      pageId: serverToEdit.page.id,
      joinId: serverToEdit.joinId,
      name, 
      redirectURL 
    })

    await refreshServer()
  }

  const handleOnRemoveLink = async (
    name: string,
  ): Promise<void> => {
    await removeServerLink.mutateAsync({ 
      pageId: serverToEdit.page.id,
      joinId: serverToEdit.joinId,
      name 
    })

    await refreshServer()
  }

  return (
    <ContentContainer>
      <Description text={description} hasVip={serverToEdit.page.planTier.privileges.PAGE_DESCRIPTION} />
    
      <WebsiteLinks
        links={serverToEdit.page.connections}
        onAddLink={handleOnAddLink}
        onRemoveLink={handleOnRemoveLink}
      />

      <SocialMediaLinks
        socialMedia={serverToEdit.page.socialMedia}
        onAddSocialMedia={handleOnAddSocialMedia}
        onRemoveSocialMedia={handleOnRemoveSocialMedia}
      />

      <Statistic
        cfxHash={serverToEdit.joinId}
        likes={{ amount: serverToEdit.page.statistics.likes, variation: 0 }}
        followers={{ amount: serverToEdit.page.statistics.followers, variation: 0 }}
        hasVip={serverToEdit.page.planTier.privileges.PAGE_STATISTICS}
      />

      <CustomLink />

      <Players
        clients={serverDynamic.playersCurrent}
        slots={serverDynamic.playersMax}
        players={[
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            likes: 12744,
            startedAt: new Date(1685825570941),
          },
        ]}
      />
    </ContentContainer>
  )
}
