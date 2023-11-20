/* eslint-disable no-undef */
import { FreeLinkDialog } from '@/components/Dialogs/FreeLink'
import { AddLink } from '@/components/EditLinks'
import { WorldIcon } from '@/components/Icons'
import { ServerConnectionsListSchemaType } from '@/schemas/servers/ConnectionsSchema'
import { styled } from '@/styles'
import { Button, Heading, Text } from '@5list-design-system/react'
import { useTranslation } from 'react-i18next'

interface WebsiteLinksProps {
  links: ServerConnectionsListSchemaType
  onAddLink: (label: string, url: string) => Promise<void> | void
  onRemoveLink: (label: string) => Promise<void> | void
}

const WebsiteLinksContainer = styled('div', {
  minHeight: '13.875rem',

  padding: '$6',

  background: 'transparent',
  border: '0.0625rem solid $neutral800',
  borderRadius: '$lg',

  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
})

const WebsiteBox = styled('div', {
  textDecoration: 'none',

  display: 'flex',
  alignItems: 'center',
  gap: '$3',
})

export const WebsiteLinks = ({
  links,
  onAddLink,
  onRemoveLink,
}: WebsiteLinksProps): JSX.Element => {
  const { t } = useTranslation('pages')

  const handleOnChange = async (name: string, url: string): Promise<void> => {
    if (url) {
      if (/\s/.test(url) && url.length > 64 && name.length > 16) return

      await onAddLink(name, url)
    } else {
      await onRemoveLink(name)
    }
  }

  return (
    <WebsiteLinksContainer>
      <Heading as={'h4'} weight={'bold'}>
        {t('serversPageEdit.linksSection.title')}
      </Heading>

      {links.map(({ name }, index) => (
        <WebsiteBox key={index}>
          <Button variation={'icon'} size={'sm'}>
            <WorldIcon css={{ fill: '$white', size: '$6' }} />
          </Button>

          <Text size={'sm'} color={'$white'} weight={'bold'}>
            {name}
          </Text>
        </WebsiteBox>
      ))}

      <FreeLinkDialog
        title={t('serversPageEdit.linksSection.addLink')}
        placeHolder={t('serversPageEdit.linksSection.enterLink')}
        onSave={handleOnChange}
        trigger={<AddLink text={t('serversPageEdit.linksSection.addLink')} />}
      />
    </WebsiteLinksContainer>
  )
}
