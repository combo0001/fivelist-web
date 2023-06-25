import { styled } from '@/styles'

/* eslint-disable no-undef */
import { Description } from './Description'
import { Links } from './Links'
import { StreamLink } from './StreamLink'

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
  const HAS_VIP = false

  return (
    <ContentContainer>
      <Description
        hasVip={HAS_VIP}
        text={
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
        }
      />

      <InformationsWrapper>
        <InformationsSide>
          <Links
            title={'Redes sociais'}
            links={[
              { label: 'Github', url: 'https://github.com/combo0001' },
              { label: 'Twitch', url: 'https://github.com/combo0001' },
              { label: 'Instagram', url: 'https://github.com/combo0001' },
              { label: 'Tiktok', url: 'https://github.com/combo0001' },
              { label: 'Facebook', url: 'https://github.com/combo0001' },
              { label: 'Discord', url: 'https://github.com/combo0001' },
              { label: 'Youtube', url: 'https://github.com/combo0001' },
            ]}
          />

          <StreamLink />
        </InformationsSide>

        <InformationsSide>
          <Links
            title={'Conexões'}
            links={[
              { label: 'Github', url: 'https://github.com/combo0001' },
              { label: 'Twitch', url: 'https://github.com/combo0001' },
            ]}
          />
        </InformationsSide>
      </InformationsWrapper>
    </ContentContainer>
  )
}
