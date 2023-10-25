/* eslint-disable no-undef */
import TrevorBackgroundImage from '@/assets/trevor.png'
import {
  CopperPlaceIcon,
  GoldPlaceIcon,
  NormalPlaceIcon,
  SilverPlaceIcon,
} from '@/components/Icons'
import { LikeButton } from '@/components/LikeButton'
import { Tag } from '@/components/Tag'
import { useTranslation } from 'react-i18next'
import { ServerPagePreviewSchemaType } from '@/schemas/servers/PagePreviewSchema'
import { ServerViewSchemaType } from '@/schemas/servers/ViewSchema'
import { styled } from '@/styles'
import { Heading } from '@5list-design-system/react'
import { useRouter } from 'next/router'
import { useRef } from 'react'

interface ServerProps extends ServerViewSchemaType {
  position: number
  canLike: boolean
  isLiked: boolean
  onLike: (pageId?: string) => Promise<void>
}

const PositionContainer = styled('div', {
  width: 'calc($10 + $4)',

  border: '0.0625rem solid $neutral800',
  borderRadius: '$lg',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '$2',
})

const PageContainer = styled('a', {
  textDecoration: 'none',

  width: '100%',

  paddingRight: '$4',
  paddingLeft: '$4',

  borderWidth: '0.0625rem',
  borderStyle: 'solid',
  borderRadius: '$lg',

  display: 'flex',
  alignItems: 'center',
  gap: '$2',
})

const InformationsContainer = styled('section', {
  flex: 1,

  height: '100%',

  display: 'flex',
  flexDirection: 'column',
  gap: '$1',
})

const ServerFont = styled('span', {
  fontFamily: `'Poppins', sans-serif`,
  fontStyle: 'normal',

  color: 'var(--text-color)',
})

const ServerNameText = styled(ServerFont, {
  fontSize: '$md',
  fontWeight: 600,
  lineHeight: '$base',
})

const ServerDescriptionText = styled(ServerFont, {
  fontSize: '$xs',
  fontWeight: 400,
  lineHeight: '$base',
})

const TagsContainer = styled('section', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  height: '$6',
})

const ServerContainer = styled('li', {
  userSelect: 'none',

  display: 'flex',

  width: '100%',
  gap: '$2',

  variants: {
    style: {
      normal: {
        [`${PageContainer}`]: {
          paddingTop: '0.9rem',
          paddingBottom: '0.9rem',

          borderColor: '$colors$neutral800',
          background: 'transparent',

          [`${InformationsContainer}`]: {
            '--text-color': '$colors$neutral100',
          },
        },
      },
      vip: {
        [`${PageContainer}`]: {
          paddingTop: '$4',
          paddingBottom: '$4',

          background: `linear-gradient(270deg, $neutral900 25%, transparent 50%), url('${TrevorBackgroundImage.src}'), rgba(0, 0, 0, 0.675)`,
          backgroundSize: '100% 100%, 90%',
          backgroundRepeat: 'no-repeat',
          backgroundBlendMode: 'normal, overlay',
          borderColor: '$colors$primary900',

          [`${InformationsContainer}`]: {
            '--text-color': '$colors$white',

            [`${TagsContainer}`]: {
              marginTop: '$3',
            },
          },
        },
      },
    },
  },
})

export const Server = ({
  position,
  cfx,
  preview,
  canLike,
  isLiked,
  onLike,
}: ServerProps): JSX.Element => {
  const { t } = useTranslation('pages')

  const isRegistered = !!preview

  const hasPage = !!isRegistered && !!preview.page
  const hasVip =
    !!isRegistered && !!preview.page && preview.page.planTier.id > 0

  const likeRef = useRef<HTMLButtonElement>()
  const router = useRouter()

  let positionIcon: React.ReactNode

  switch (position) {
    case 1:
      positionIcon = <GoldPlaceIcon css={{ size: '$8' }} />

      break
    case 2:
      positionIcon = <SilverPlaceIcon css={{ size: '$8' }} />

      break
    case 3:
      positionIcon = <CopperPlaceIcon css={{ size: '$6' }} />

      break
    default:
      positionIcon = <NormalPlaceIcon css={{ size: '$6' }} />
  }

  const handlePageOnClick = ({ target }: React.MouseEvent): void => {
    if (likeRef.current) {
      const clickedElement = target as unknown as HTMLElement
      const isButton = likeRef.current.contains(clickedElement)

      if (!isButton) {
        router.push(`/servers/${isRegistered ? preview.joinId : cfx.joinId}`)
      }
    }
  }

  const handleLikeOnClick = async (): Promise<void> => {
    if (canLike && !isLiked) {
      await onLike()
    }
  }

  return (
    <ServerContainer style={hasVip ? 'vip' : 'normal'}>
      <PositionContainer>
        <Heading as={'h5'}>{position}</Heading>

        {positionIcon}
      </PositionContainer>

      <PageContainer onClick={handlePageOnClick}>
        <InformationsContainer>
          <ServerNameText>{cfx.projectName}</ServerNameText>

          {hasVip && (
            <ServerDescriptionText>
              {(preview.page as ServerPagePreviewSchemaType).description}
            </ServerDescriptionText>
          )}

          <TagsContainer>
            <Tag active>
              {cfx.playersCurrent}
              {' '}{t('home.serverLabels.playersAmount')}{' '}
              {cfx.playersMax}
            </Tag>

            <Tag>
              {hasPage
                ? (
                    preview.page as ServerPagePreviewSchemaType
                  ).statistic.followers.toLocaleString()
                : 0}{' '}
              {t('home.serverLabels.followers')}
            </Tag>

            <Tag>
              {hasPage
                ? (
                    preview.page as ServerPagePreviewSchemaType
                  ).statistic.reviews.toLocaleString()
                : 0}{' '}
              {t('home.serverLabels.reviews')}
            </Tag>
          </TagsContainer>
        </InformationsContainer>

        <LikeButton
          outlined={!isLiked}
          disabled={canLike ? false : !isLiked}
          reference={likeRef as any}
          onClick={handleLikeOnClick}
        >
          {hasPage
            ? (
                preview.page as ServerPagePreviewSchemaType
              ).statistic.likes.toLocaleString()
            : 0}
        </LikeButton>
      </PageContainer>
    </ServerContainer>
  )
}
