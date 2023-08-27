import { styled } from '@/styles'

/* eslint-disable no-undef */
import { Description } from './Description'
import { Links } from './Links'
import { StreamLink } from './StreamLink'
import { UserProfileSchemaType } from '@/@types/schemas/users/ProfileSchema'

interface ProfileHeaderProps {
  user: UserProfileSchemaType
}

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

export const ProfileContent = ({ user }: ProfileHeaderProps): JSX.Element => {
  return (
    <ContentContainer>
      <Description
        hasVip={user.planTier.privileges.PROFILE_DESCRIPTION}
        text={user.page.description || 'Descrição não foi criada.'}
      />

      <InformationsWrapper>
        <InformationsSide>
          <Links
            title={'Redes sociais'}
            links={user.page.socialMedia.map(
              ({ socialMedia: label, profileId }) => ({
                label,
                url: `https://youtube.com/${profileId}`,
              }),
            )}
          />

          <StreamLink streamURL={user.page.streamURL || ''} />
        </InformationsSide>

        <InformationsSide>
          <Links
            title={'Conexões'}
            links={user.page.connections.map(({ name: label, url }) => ({
              label,
              url,
            }))}
          />
        </InformationsSide>
      </InformationsWrapper>
    </ContentContainer>
  )
}
