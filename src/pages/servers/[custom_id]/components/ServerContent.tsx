/* eslint-disable no-undef */
import { styled } from '@/styles'

import { useServerView } from '../providers/ServerViewProvider'
import { Description } from './Description'
import { Players } from './Players'
import { Reviews } from './Reviews'
import { SocialMediaLinks } from './SocialMedia'
import { Statistic } from './Statistic'
import { WebsiteLinks } from './WebsiteLinks'

const ContentContainer = styled('section', {
  width: '94.5%',

  display: 'grid',
  gridTemplateRows: 'auto auto auto',
  gridTemplateColumns: '552fr 48fr 472fr',
  gridGap: '$8',

  paddingBottom: '5.125rem',

  '& > *:nth-child(1)': {
    gridArea: '1 / 1 / 2 / 3',
  },

  '& > *:nth-child(2)': {
    gridArea: '1 / 3 / 2 / 4',
  },

  '& > *:nth-child(3)': {
    gridArea: '2 / 1 / 3 / 2',
  },

  '& > *:nth-child(4)': {
    gridArea: '2 / 2 / 3 / 4',
  },

  '& > *:nth-child(5)': {
    gridArea: '3 / 1 / 4 / 3',
  },

  '& > *:nth-child(6)': {
    gridArea: '3 / 3 / 4 / 4',
  },
})

export const ServerContent = (): JSX.Element => {
  const { serverView, serverDynamic } = useServerView()

  const description = serverView.page.description || 'Descrição não foi alterada'

  return (
    <ContentContainer>
      <Description text={description} hasVip={serverView.page.planTier.privileges.PAGE_DESCRIPTION} />

      <Statistic players={0} />

      <WebsiteLinks
        links={serverView.page.connections}
      />

      <SocialMediaLinks
        socialMedia={serverView.page.socialMedia}
      />

      <Reviews />

      <Players
        clients={serverDynamic?.playersCurrent || 0}
        slots={serverDynamic?.playersMax || 0}
        players={[
          {
            name: 'Willian',
            avatarURL:
              'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png',
            likes: 12344,
            startedAt: new Date(1685825570941),
          },
        ]}
      />
    </ContentContainer>
  )
}
