import { WorldIcon } from '@/components/Icons'
import { ServerConnectionsListSchemaType } from '@/schemas/servers/ConnectionsSchema'
import { styled } from '@/styles'
import { Button, Heading, Text } from '@5list-design-system/react'
import { useTranslation } from 'react-i18next'

/* eslint-disable no-undef */
interface WebsiteLinksProps {
  links: ServerConnectionsListSchemaType
}

const WebsiteLinksContainer = styled('div', {
  minHeight: 'fit-content',

  padding: '$6',

  background: 'transparent',
  border: '0.0625rem solid $neutral800',
  borderRadius: '$lg',

  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
})

const WebsiteLinkBox = styled('a', {
  textDecoration: 'none',

  cursor: 'pointer',

  display: 'flex',
  alignItems: 'center',
  gap: '$3',
})

export const WebsiteLinks = ({ links }: WebsiteLinksProps): JSX.Element => {
  const { t } = useTranslation('pages')

  return (
    <WebsiteLinksContainer>
      <Heading as={'h4'} weight={'bold'}>
        {t('serversPage.linksSection.title')}
      </Heading>

      {links.length ? (
        links.map(({ name, redirectURL }, index) => (
          <WebsiteLinkBox href={redirectURL} target={'_blank'} key={index}>
            <Button variation={'icon'} size={'sm'}>
              <WorldIcon css={{ fill: '$white', size: '$6' }} />
            </Button>

            <Text size={'sm'} color={'$white'} weight={'bold'}>
              {name}
            </Text>
          </WebsiteLinkBox>
        ))
      ) : (
        <Text>{t('serversPage.linksSection.withoutLinks')}</Text>
      )}
    </WebsiteLinksContainer>
  )
}
