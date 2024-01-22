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
import { ServerDynamicSchemaType } from '@/schemas/servers/DynamicSchema'
import { useClientUser } from '@/providers/UserProvider'
import { searchVariable } from '../utils/searchVariable'
import { useTranslation } from 'react-i18next'

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

  padding: '0 $8 $6 $8',

  display: 'flex',
  flexDirection: 'column',
})

const HeaderTopContainer = styled('div', {
  width: '100%',
  height: '$20',

  padding: '0.9063rem 0',

  display: 'flex',
  gap: '$6',
  alignItems: 'center',
})

const EditButton = styled(Button, {
  marginLeft: 'auto',

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
  const { t } = useTranslation('pages')
  const { user } = useClientUser()

  const { serverView, serverDynamic: dynamicNullable } = useServerView()
  const serverDynamic = dynamicNullable as ServerDynamicSchemaType

  const hasBanner =
    serverView.page.planTier.privileges.PAGE_BANNER && serverView.page.bannerURL
  const isOwner =
    user &&
    serverView.page.ownerUser &&
    serverView.page.ownerUser?.id === user?.id

  return (
    <HeaderWrapper>
      {hasBanner && <Banner src={serverView.page.bannerURL as string} />}

      <HeaderContainer>
        <HeaderTopContainer>
          {isOwner && (
            <Link href={`/servers/${serverView.joinId}/edit`} legacyBehavior>
              <EditButton size={'sm'}>
                {t('serversPage.editButton')}
                <PencilIcon css={{ size: '$4', fill: '$white' }} />
              </EditButton>
            </Link>
          )}
        </HeaderTopContainer>

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
            discordURL={searchVariable(
              ['discord', 'discord_url'],
              serverDynamic.variables,
            )}
            storeURL={searchVariable(
              ['loja', 'store', 'marketplace'],
              serverDynamic.variables,
            )}
            websiteURL={searchVariable(
              ['site', 'website'],
              serverDynamic.variables,
            )}
          />

          <Divisor />

          <ActionsContainer>
            <Button
              as={'a'}
              href={`fivem://connect/${serverView.joinId}`}
              size={'lg'}
            >
              {t('serversPage.connectButton')}
            </Button>

            {isOwner && (
              <Link
                href={`/servers/${serverView.joinId}/premium`}
                legacyBehavior
              >
                {serverView.page.planTier.id === 0 ? (
                  <Button size={'lg'} outlined>
                    {t('serversPage.purchasePremiumButton')}
                  </Button>
                ) : (
                  <Button size={'lg'} outlined>
                    {t('serversPage.renewPremiumButton')}
                  </Button>
                )}
              </Link>
            )}

            {serverView.page.ownerUser ? (
              <Link
                href={`/users/${serverView.page.ownerUser.customId}`}
                legacyBehavior
              >
                <Tag css={{ cursor: 'pointer' }}>
                  {t('serversPage.managedBy') + ' '}@
                  {serverView.page.ownerUser.customId}
                </Tag>
              </Link>
            ) : (
              <Tag>{t('serversPage.withoutManagement')}</Tag>
            )}
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
  const { t } = useTranslation('pages')

  return (
    <TagsContainer>
      <TagHighlighted active>
        {clients.toLocaleString() + ' '}
        {t('serversPage.statisticLabels.playersAmount')}
      </TagHighlighted>

      <TagHighlighted>
        {followers.toLocaleString() + ' '}
        {t('serversPage.statisticLabels.followers', { count: followers })}
      </TagHighlighted>

      <TagHighlighted>
        {reviews.toLocaleString() + ' '}
        {t('serversPage.statisticLabels.reviews', { count: reviews })}
      </TagHighlighted>
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
  const { t } = useTranslation('pages')

  return (
    <LinksContainer>
      {websiteURL && (
        <LinkAnchor href={getCorrectUrl(websiteURL)} target={'_blank'}>
          <LinkIcon css={{ size: '$4', fill: '$neutral100' }} />

          <Text size={'xs'} color={'$colors$white'}>
            {t('serversPage.tagsLabels.website')}
          </Text>
        </LinkAnchor>
      )}

      {storeURL && (
        <LinkAnchor href={getCorrectUrl(storeURL)} target={'_blank'}>
          <StoreIcon css={{ size: '$4', fill: '$neutral100' }} />

          <Text size={'xs'} color={'$colors$white'}>
            {t('serversPage.tagsLabels.marketplace')}
          </Text>
        </LinkAnchor>
      )}

      {discordURL && (
        <LinkAnchor href={getCorrectUrl(discordURL)} target={'_blank'}>
          <DiscordIcon css={{ size: '$4', fill: '$neutral100' }} />

          <Text size={'xs'} color={'$colors$white'}>
            {t('serversPage.tagsLabels.discord')}
          </Text>
        </LinkAnchor>
      )}
    </LinksContainer>
  )
}
