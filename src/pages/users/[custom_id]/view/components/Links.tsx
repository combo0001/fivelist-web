import { WorldIcon } from '@/components/Icons'
import { styled } from '@/styles'
import { Button, Heading, Text } from '@5list-design-system/react'

/* eslint-disable no-undef */
interface LinksProps {
  title: string
  links: { label: string; url: string }[]
}

const LinksContainer = styled('div', {
  minHeight: '9.25rem',

  padding: '$6',

  background: 'transparent',
  border: '0.0625rem solid $neutral800',
  borderRadius: '$lg',

  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
})

const WebsiteLinksContainer = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '$4',

  '& > *': {
    flex: '1 0 34%',
  },
})

const WebsiteLinkBox = styled('a', {
  textDecoration: 'none',

  cursor: 'pointer',

  display: 'flex',
  alignItems: 'center',
  gap: '$3',
})

export const Links = ({ title, links }: LinksProps): JSX.Element => {
  return (
    <LinksContainer>
      <Heading as={'h4'} weight={'bold'}>
        {title}
      </Heading>

      <WebsiteLinksContainer>
        {links.map(({ label, url }, index) => (
          <WebsiteLinkBox href={url} target={'_blank'} key={index}>
            <Button variation={'icon'} size={'sm'}>
              <WorldIcon css={{ fill: '$white', size: '$6' }} />
            </Button>

            <Text
              size={'sm'}
              color={'$white'}
              weight={'bold'}
              css={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
            >
              {label}
            </Text>
          </WebsiteLinkBox>
        ))}
      </WebsiteLinksContainer>
    </LinksContainer>
  )
}
