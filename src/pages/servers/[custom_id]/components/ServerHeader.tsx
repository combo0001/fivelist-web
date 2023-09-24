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
import { ServerDynamicSchemaType, ServerDynamicVariablesType } from '@/schemas/servers/DynamicSchema'

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

const searchVariable = (expressions: string[], variables: ServerDynamicVariablesType): string | undefined => {
  for (let variableName in variables) {
    const variableNameFormatted = variableName.toLowerCase() 

    if (!expressions.includes(variableNameFormatted)) continue

    const variableValue = variables[variableName]

    return variableValue
  }
}

export const ServerHeader = (): JSX.Element => {
  const { serverView, serverDynamic: dynamicNullable } = useServerView()
  const serverDynamic = dynamicNullable as ServerDynamicSchemaType
  
  const hasBanner = serverView.page.planTier.privileges.PAGE_BANNER && serverView.page.bannerURL

  return (
    <HeaderWrapper>
      {
        hasBanner &&
        <Banner src={serverView.page.bannerURL as string} />
      }

      <HeaderContainer>
        {false && (
          <Link href={`/servers/${serverView.page.customId}/edit`} legacyBehavior>
            <EditButton size={'lg'}>
              Editar
              <PencilIcon css={{ size: '$4', fill: '$white' }} />
            </EditButton>
          </Link>
        )}

        <InformationsContainer>
          <ServerTags
            clients={serverDynamic.playersCurrent || 0}
            followers={serverView.page.statistics.followers}
            reviews={serverView.page.statistics.reviews}
          />

          <ServerNameText as={'h2'}>
            {serverDynamic.hostName.replace(/\^\d/g, '')}
          </ServerNameText>

          <ServerLinks
            discordURL={searchVariable(['discord', 'discord_url'], serverDynamic.variables)}
            storeURL={searchVariable(['loja', 'store', 'marketplace'], serverDynamic.variables)}
            websiteURL={searchVariable(['site', 'website'], serverDynamic.variables)}
          />

          <Divisor />

          <ActionsContainer>
            <Button as={'a'} href={`fivem://connect/${serverView.joinId}`} size={'lg'}>
              Conectar Servidor
            </Button>

            <Link href={'/home'} legacyBehavior>
              <Button size={'lg'} outlined>
                Obtenha o Premium
              </Button>
            </Link>

            {
              serverView.page.ownerUser ?
                <Tag>Gerenciado por @{serverView.page.ownerUser.customId}</Tag>
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

const getCorrectUrl = (url: string) => {
  if (url.startsWith('http')) return url
  if (url.startsWith('https')) return url

  return `https://${url}`
}

const ServerLinks = ({
  discordURL,
  websiteURL,
  storeURL,
}: ServerLinksProps): JSX.Element => {
  return (
    <LinksContainer>
      {websiteURL && (
        <LinkAnchor href={getCorrectUrl(websiteURL)} target={'_blank'}>
          <LinkIcon css={{ size: '$4', fill: '$neutral100' }} />

          <Text size={'xs'} color={'$colors$white'}>
            Website
          </Text>
        </LinkAnchor>
      )}

      {storeURL && (
        <LinkAnchor href={getCorrectUrl(storeURL)} target={'_blank'}>
          <StoreIcon css={{ size: '$4', fill: '$neutral100' }} />

          <Text size={'xs'} color={'$colors$white'}>
            Loja
          </Text>
        </LinkAnchor>
      )}

      {discordURL && (
        <LinkAnchor href={getCorrectUrl(discordURL)} target={'_blank'}>
          <DiscordIcon css={{ size: '$4', fill: '$neutral100' }} />

          <Text size={'xs'} color={'$colors$white'}>
            Discord
          </Text>
        </LinkAnchor>
      )}
    </LinksContainer>
  )
}
