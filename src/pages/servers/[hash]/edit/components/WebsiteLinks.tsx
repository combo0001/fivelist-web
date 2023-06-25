/* eslint-disable no-undef */
import { LinkDialog } from '@/components/Dialogs/Link'
import { AddLink } from '@/components/EditLinks'
import { WorldIcon } from '@/components/Icons'
import { styled } from '@/styles'
import { Button, Heading, Text } from '@5list-design-system/react'

interface WebsiteLinksProps {
  links: ServersType.WebsiteLinksObject[]
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

  cursor: 'pointer',

  display: 'flex',
  alignItems: 'center',
  gap: '$3',
})

export const WebsiteLinks = ({ links }: WebsiteLinksProps): JSX.Element => {
  return (
    <WebsiteLinksContainer>
      <Heading as={'h4'} weight={'bold'}>
        Links externos
      </Heading>

      {links.map(({ label }, index) => (
        <WebsiteBox key={index}>
          <Button variation={'icon'} size={'sm'}>
            <WorldIcon css={{ fill: '$white', size: '$6' }} />
          </Button>

          <Text size={'sm'} color={'$white'} weight={'bold'}>
            {label}
          </Text>
        </WebsiteBox>
      ))}

      <LinkDialog
        title={'Adicionar site'}
        trigger={<AddLink text={'Adicionar site'} />}
      />
    </WebsiteLinksContainer>
  )
}
