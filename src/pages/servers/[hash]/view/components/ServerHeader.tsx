/* eslint-disable no-undef */
import { styled } from '@/styles'
import Image from 'next/image'
import { useServer } from '../providers/ServerProvider'
import { Button, Heading, Text } from '@5list-design-system/react'
import {
  DiscordIcon,
  LinkIcon,
  PencilIcon,
  StoreIcon,
} from '@/components/Icons'
import { Tag } from '@/components/Tag'
import Link from 'next/link'

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
})

const BannerImage = styled(Image, {
  width: '100%',
  height: '30.25rem',
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
  const { clients, endpoint, reviews, tags, followers, name, bannerURL } =
    useServer()

  return (
    <HeaderWrapper>
      <BannerImage
        src={bannerURL}
        alt={'Banner of server'}
        width={1200}
        height={484}
      />

      <HeaderContainer>
        <EditButton>
          Editar
          <PencilIcon css={{ size: '$4', fill: '$white' }} />
        </EditButton>

        <InformationsContainer>
          <ServerTags
            clients={clients}
            followers={followers}
            reviews={reviews}
          />

          <ServerNameText as={'h2'}>{name}</ServerNameText>

          <ServerLinks
            discordUrl={tags.discord}
            storeUrl={tags.store}
            websiteUrl={tags.website}
          />

          <Divisor />

          <ActionsContainer>
            <Button as={'a'} href={`fivem://connect/${endpoint}`} size={'lg'}>
              Conectar Servidor
            </Button>

            <Link href={'/home'} legacyBehavior>
              <Button size={'lg'} outlined>
                Obtenha o Premium
              </Button>
            </Link>

            <Tag>Gerenciado por @WILLZAO</Tag>
          </ActionsContainer>
        </InformationsContainer>
      </HeaderContainer>
    </HeaderWrapper>
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
      <TagHighlighted active>{clients} Online</TagHighlighted>
      <TagHighlighted>{followers} Seguidores</TagHighlighted>
      <TagHighlighted>{reviews} Avaliações</TagHighlighted>
    </TagsContainer>
  )
}

interface ServerLinksProps {
  discordUrl?: string
  websiteUrl?: string
  storeUrl?: string
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
  discordUrl,
  websiteUrl,
  storeUrl,
}: ServerLinksProps): JSX.Element => {
  return (
    <LinksContainer>
      {websiteUrl && (
        <LinkAnchor href={websiteUrl} target={'_blank'}>
          <LinkIcon css={{ size: '$4', fill: '$neutral100' }} />

          <Text size={'xs'} color={'$colors$white'}>
            Website
          </Text>
        </LinkAnchor>
      )}

      {storeUrl && (
        <LinkAnchor href={storeUrl} target={'_blank'}>
          <StoreIcon css={{ size: '$4', fill: '$neutral100' }} />

          <Text size={'xs'} color={'$colors$white'}>
            Loja
          </Text>
        </LinkAnchor>
      )}

      {discordUrl && (
        <LinkAnchor href={discordUrl} target={'_blank'}>
          <DiscordIcon css={{ size: '$4', fill: '$neutral100' }} />

          <Text size={'xs'} color={'$colors$white'}>
            Discord
          </Text>
        </LinkAnchor>
      )}
    </LinksContainer>
  )
}
