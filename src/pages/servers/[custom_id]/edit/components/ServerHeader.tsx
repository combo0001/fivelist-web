import { ImageUploader } from '@/components/Dialogs/Image'
/* eslint-disable no-undef */
import {
  DiscordIcon,
  ErrorIcon,
  LinkIcon,
  PencilIcon,
  StoreIcon,
} from '@/components/Icons'
import { Tag } from '@/components/Tag'
import { styled } from '@/styles'
import { Button, Heading, Text } from '@5list-design-system/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { useServerEditor } from '../providers/ServerEditorProvider'
import { ServerDynamicSchemaType } from '@/schemas/servers/DynamicSchema'
import { searchVariable } from '../../utils/searchVariable'
import { v4 } from 'uuid'
import { useStorage } from '@/providers/StorageProvider'
import { trpc } from '@/utils/trpc'

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

  padding: '$5 $8 $6 $8',

  display: 'flex',
  flexDirection: 'column',
})

const HeaderTopContainer = styled('div', {
  width: '100%',
  height: '$10',

  display: 'flex',

  position: 'relative',
  overflow: 'visible',
})

const BannerContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  position: 'absolute',
})

const EditButton = styled(Button, {
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

const PremiumContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',
})

export const ServerHeader = (): JSX.Element => {
  const { uploadFile } = useStorage()

  const { serverDynamic: serverDynamicNullable, serverToEdit, refreshServer } = useServerEditor()
  const serverDynamic = serverDynamicNullable as ServerDynamicSchemaType
  const setServerBanner = trpc.servers.setServerBanner.useMutation()

  const [isLoading, setLoading] = useState<boolean>(false)
  const [isBannerEditing, setBannerEdit] = useState<boolean>(false)

  const hasVip = serverToEdit.page.planTier.id > 0
  const hasBanner = serverToEdit.page.planTier.privileges.PAGE_BANNER && serverToEdit.page.bannerURL

  const toggleBannerEdit = (): void =>
    !isLoading ? setBannerEdit((state) => !state) : undefined

  const updateBanner = async (file: File): Promise<void> => {
    setLoading(true)

    const imageURL = await uploadFile('banners', `${serverToEdit.page.id}/${v4()}.png`, file)

    if (imageURL) {
      await setServerBanner.mutateAsync({ imageURL, pageId: serverToEdit.page.id, joinId: serverToEdit.joinId })

      await refreshServer()
    }

    setLoading(false)
  }

  const handleOnBannerSent = (file: File): void => {
    toggleBannerEdit()
    updateBanner(file)
  }

  return (
    <HeaderWrapper>
      {hasBanner && <Banner src={serverToEdit.page.bannerURL as string} />}

      <HeaderContainer>
        <HeaderTopContainer>
          <BannerContainer>
            <EditButton size={'sm'} onClick={toggleBannerEdit}>
              Editar capa
              <PencilIcon css={{ size: '$4', fill: '$white' }} />
            </EditButton>

            {isBannerEditing && (
              <ImageUploader onFileSelected={handleOnBannerSent} />
            )}
          </BannerContainer>

          <Link href={`/servers/${serverToEdit.joinId}`} legacyBehavior>
            <EditButton size={'sm'} css={{ marginLeft: 'auto' }}>
              Sair da edição
              <ErrorIcon css={{ size: '$4', fill: '$white' }} />
            </EditButton>
          </Link>
        </HeaderTopContainer>

        <InformationsContainer>
          <ServerTags
            clients={serverDynamic.playersCurrent}
            followers={serverToEdit.page.statistics.followers}
            reviews={serverToEdit.page.statistics.reviews}
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
            <PremiumContainer>
              <Link href={'/premium/servers'} legacyBehavior>
                <Button size={'lg'}>
                  {hasVip ? 'Renovar premium' : 'Obtenha o Premium'}
                </Button>
              </Link>

              {hasVip && (
                <Text size={'md'} weight={'bold'}>
                  Seu plano termina em 15 dias
                </Text>
              )}
            </PremiumContainer>

            {
              serverToEdit.page.ownerUser ?
                <Link href={`/users/${serverToEdit.page.ownerUser.customId}`} legacyBehavior>
                  <Tag css={{ cursor: 'pointer' }}>
                    Gerenciado por @{serverToEdit.page.ownerUser.customId}
                  </Tag>
                </Link>
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
      <TagHighlighted active>{clients} Online</TagHighlighted>
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
