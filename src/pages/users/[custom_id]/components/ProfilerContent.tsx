/* eslint-disable no-undef */
import { styled } from '@/styles'

import { Description } from './Description'
import { SocialMediaLinks } from './SocialMedia'
import { RecentActivities } from './RecentActivities'
import { StreamLink } from './StreamLink'
import { useUserView } from '../providers/UserViewProvider'
import { ConnectionsLinks } from './ConnectionsLinks'

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

export const ProfileContent = (): JSX.Element => {
  const { user } = useUserView()

  const hasDescription = user.planTier.privileges.PROFILE_DESCRIPTION

  return (
    <ContentContainer>
      {hasDescription && <Description />}

      <InformationsWrapper>
        <InformationsSide>
          <SocialMediaLinks socialMedia={user.page.socialMedia} />

          <StreamLink url={user.page.streamURL} />
        </InformationsSide>

        <InformationsSide>
          <ConnectionsLinks connections={user.page.connections} />

          <RecentActivities activities={user.page.activities} />
        </InformationsSide>
      </InformationsWrapper>
    </ContentContainer>
  )
}
