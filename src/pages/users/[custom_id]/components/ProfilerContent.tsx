/* eslint-disable no-undef */
import { styled } from '@/styles'

import { Description } from './Description'
import { SocialMediaLinks } from './SocialMedia'
import { Publications } from './Publications'
import { RecentActivities } from './RecentActivities'
import { StreamLink } from './StreamLink'
import { useUserView } from '../providers/UserViewProvider'
import { ConnectionsLinks } from './ConnectionsLinks'

interface ProfileContentProps {}

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

export const ProfileContent = ({}: ProfileContentProps): JSX.Element => {
  const { user } = useUserView()

  const hasDescription = user.planTier.privileges.PROFILE_DESCRIPTION

  return (
    <ContentContainer>
      {hasDescription && (
        <Description />
      )}

      <InformationsWrapper>
        <InformationsSide>
          <SocialMediaLinks socialMedia={user.page.socialMedia} />

          <StreamLink url={user.page.streamURL} />
        </InformationsSide>

        <InformationsSide>
          <ConnectionsLinks connections={user.page.connections} />

          <RecentActivities
            activities={user.page.activities}
          />
        </InformationsSide>
      </InformationsWrapper>

      <Publications
        publications={
          [
            // {
            //   author: {
            //     name: 'Willian',
            //     avatarURL:
            //       'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            //   },
            //   message:
            //     'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
            //   createdAt: new Date(1685825570941),
            //   likes: 23,
            // },
          ]
        }
      />
    </ContentContainer>
  )
}
