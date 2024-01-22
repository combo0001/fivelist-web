/* eslint-disable no-undef */
import { styled } from '@/styles'
import { Heading, Text } from '@5list-design-system/react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

interface PlayersProps {
  clients: number
  slots: number
}

const PlayersContainer = styled('div', {
  minHeight: '9rem',
  height: 'fit-content',

  padding: '$6 $8',

  display: 'flex',
  flexDirection: 'column',
  gap: '$6',

  border: '0.0625rem solid $neutral800',
  borderRadius: '$lg',
})

const TitleContainer = styled('section', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const PlayersList = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
})

export const Players = ({ clients, slots }: PlayersProps): JSX.Element => {
  const { t } = useTranslation('pages')

  // const [showMore, setShowMore] = useState<boolean>(false)
  // const toggleShowMore = () => setShowMore((status) => !status)
  // const isNeedShowMore = players.length > 9

  return (
    <PlayersContainer>
      <TitleContainer>
        <Heading as={'h5'} weight={'bold'}>
          {t('serversPage.playersSection.title')}
        </Heading>

        <Text size={'sm'}>
          {clients}/{slots}
        </Text>
      </TitleContainer>

      {/* {players.length > 0 ? (
        <PlayersList>
          {players
            .filter((_, index) => showMore || index < 9)
            .map((player, index) => (
              <Player {...player} key={index} />
            ))}
        </PlayersList>
      ) : (
        <Heading as={'h5'} color={'$neutral100'}>
          {t('serversPage.playersSection.withoutPlayers')}
        </Heading>
      )}

      {isNeedShowMore && (
        <Button
          css={{ marginTop: 'auto', alignSelf: 'center' }}
          size={'lg'}
          outlined
          onClick={toggleShowMore}
        >
          {!showMore ? t('serversPage.playersSection.loadMore') : t('serversPage.playersSection.loadLess')}
        </Button>
      )} */}
    </PlayersContainer>
  )
}

// const PlayerContainer = styled('div', {
//   display: 'flex',
//   alignItems: 'center',
//   gap: '$4',

//   padding: '$2 0',
// })

// const AvatarImage = styled(Image, {
//   borderRadius: '$full',

//   size: '$8',
// })

// const NameText = styled(Text, {
//   flex: 1,

//   maxWidth: '100%',
//   textOverflow: 'ellipsis',

//   whiteSpace: 'nowrap',
// })

// const Player = ({
//   name,
//   avatarURL,
//   startedAt,
// }: ServersType.PlayerObject): JSX.Element => {
//   return (
//     <PlayerContainer>
//       <AvatarImage
//         src={avatarURL}
//         alt={'Player avatar'}
//         width={56}
//         height={56}
//       />

//       <NameText size={'sm'} weight={'bold'} css={{ flex: 1 }}>
//         {name}
//       </NameText>

//       <Text size={'sm'}>
//         Jogando{' '}
//         {formatDistanceToNow(startedAt, { addSuffix: true, locale: ptBR })}
//       </Text>
//     </PlayerContainer>
//   )
// }
