import {
  DiscordIcon,
  LinkIcon,
  PencilIcon,
  StoreIcon,
} from '@/components/Icons'
import { Tag } from '@/components/Tag'
/* eslint-disable no-undef */
import { styled } from '@/styles'
import { Button, Heading, Text } from '@5list-design-system/react'
import Image from 'next/image'
import Link from 'next/link'

import { useServerView } from '../providers/ServerViewProvider'

const HeaderWrapper = styled('section', {
  userSelect: 'none',

  width: '100%',
  height: '30.25rem',

  display: 'grid',
  gridTemplateRows: '1fr',
  gridTemplateColumns: '1fr',

  '& > *': {
    gridRow: 1,
    gridColumn: 1,
  },

  '& > *:nth-child(1)': {
    zIndex: 0,
  },

  '& > *:nth-child(2)': {
    zIndex: 1,
  },

  '& > *:nth-child(3)': {
    zIndex: 2,
  },
})

const HeaderContainer = styled('section', {
  width: '100%',
  height: '100%',

  padding: '$8 $8 $6 $8',

  display: 'flex',
  flexDirection: 'column',
})

const EditButton = styled(Button, {
  alignSelf: 'end',

  gap: '$3',
})

const InformationsContainer = styled('section', {
  marginTop: 'auto',

  width: '100%',

  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
})

const ServerNameText = styled(Heading, {
  maxWidth: '100%',
  whiteSpace: 'pre-wrap',
})

const Divisor = styled('div', {
  width: '100%',
  height: '0.125rem',

  background: '$neutral100',

  opacity: 0.1,
  transform: 'matrix(1, 0, 0, -1, 0, 0)',
})

const ActionsContainer = styled('section', {
  width: '100%',

  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  '& > *:last-child': {
    marginLeft: 'auto',
  },
})

export const ServerHeader = (): JSX.Element => {
  const { server } = useServerView()
  
  const hasBanner = server.page.planTier.privileges.PAGE_BANNER && server.page.bannerURL

  return (
    <HeaderWrapper>
      {
        hasBanner &&
        <Banner src={server.page.bannerURL as string} />
      }

      <HeaderContainer>
        {false && (
          <Link href={`/servers/${server.page.customId}/edit`} legacyBehavior>
            <EditButton size={'lg'}>
              Editar
              <PencilIcon css={{ size: '$4', fill: '$white' }} />
            </EditButton>
          </Link>
        )}

        <InformationsContainer>
          <ServerTags
            clients={server.playersCurrent}
            followers={server.page.statistics.followers}
            reviews={server.page.statistics.reviews}
          />

          <ServerNameText as={'h2'}>{server.hostName.replace(/\^\d/g, '')}</ServerNameText>

          <ServerLinks
            discordURL={'#Discord'}
            storeURL={'#Store'}
            websiteURL={'#Website'}
          />

          <Divisor />

          <ActionsContainer>
            <Button as={'a'} href={`fivem://connect/${server.joinId}`} size={'lg'}>
              Conectar Servidor
            </Button>

            <Link href={'/home'} legacyBehavior>
              <Button size={'lg'} outlined>
                Obtenha o Premium
              </Button>
            </Link>

            {
              server.page.ownerUser ?
                <Tag>Gerenciado por @{server.page.ownerUser.customId}</Tag>
                : <Tag>Servidor não gerenciado</Tag>
            }
          </ActionsContainer>
        </InformationsContainer>
      </HeaderContainer>
    </HeaderWrapper>
  )
}

interface BannerProps {
  src?: string
}

const BannerImage = styled(Image, {
  width: '100%',
  height: '30.25rem',

  objectFit: 'cover',
  opacity: 1,
})

const BannerOverlay = styled('div', {
  width: '100%',
  height: '30.25rem',

  background:
    'linear-gradient(360deg, rgba(0, 0, 0, 1) 19.32%, rgba(0, 0, 0, 0) 75.31%)',
  opacity: 0.8,
})

const Banner = ({ src }: BannerProps): JSX.Element => {
  return (
    <>
      {src && <BannerImage src={src} alt={''} width={1200} height={484} />}

      <BannerOverlay />
    </>
  )
}

interface ServerTagsProps {
  clients: number
  followers: number
  reviews: number
}

const TagsContainer = styled('div', {
  display: 'flex',
  gap: '$2',
})

const TagHighlighted = styled(Tag, {
  '& > *': {
    color: '$white',
  },
})

const ServerTags = ({
  clients,
  followers,
  reviews,
}: ServerTagsProps): JSX.Element => {
  return (
    <TagsContainer>
      <TagHighlighted active>{clients} Jogando</TagHighlighted>
      <TagHighlighted>{followers} Seguidores</TagHighlighted>
      <TagHighlighted>{reviews} Avaliações</TagHighlighted>
    </TagsContainer>
  )
}

interface ServerLinksProps {
  discordURL?: string
  websiteURL?: string
  storeURL?: string
}

const LinksContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
})

const LinkAnchor = styled('a', {
  textDecoration: 'none',

  display: 'flex',
  gap: '$2',
  alignItems: 'center',
})

const ServerLinks = ({
  discordURL,
  websiteURL,
  storeURL,
}: ServerLinksProps): JSX.Element => {
  return (
    <LinksContainer>
      {websiteURL && (
        <LinkAnchor href={websiteURL} target={'_blank'}>
          <LinkIcon css={{ size: '$4', fill: '$neutral100' }} />

          <Text size={'xs'} color={'$colors$white'}>
            Website
          </Text>
        </LinkAnchor>
      )}

      {storeURL && (
        <LinkAnchor href={storeURL} target={'_blank'}>
          <StoreIcon css={{ size: '$4', fill: '$neutral100' }} />

          <Text size={'xs'} color={'$colors$white'}>
            Loja
          </Text>
        </LinkAnchor>
      )}

      {discordURL && (
        <LinkAnchor href={discordURL} target={'_blank'}>
          <DiscordIcon css={{ size: '$4', fill: '$neutral100' }} />

          <Text size={'xs'} color={'$colors$white'}>
            Discord
          </Text>
        </LinkAnchor>
      )}
    </LinksContainer>
  )
}
