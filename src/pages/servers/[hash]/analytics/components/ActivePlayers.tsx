/* eslint-disable no-undef */

import { styled } from '@/styles'
import { Button, Heading, Select, Text } from '@5list-design-system/react'
import Image from 'next/image'
import { useState } from 'react'

interface ActivePlayersProps {
  players: ServersType.PlayerObject[]
}

const ActivePlayersContainer = styled('div', {
  padding: '$6',

  display: 'flex',
  flexDirection: 'column',
  gap: '$6',

  border: '0.0625rem solid $neutral700',
  borderRadius: '$lg',
})

const TitleContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  height: '$10',
})

const ActiveListContainer = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',

  '& > *': {
    flexShrink: 0,
  },
})

export const ActivePlayers = ({ players }: ActivePlayersProps): JSX.Element => {
  const [showMore, setShowMore] = useState<boolean>(false)

  const toggleShowMore = () => setShowMore((status) => !status)

  const isNeedShowMore = players.length > 4

  return (
    <ActivePlayersContainer>
      <TitleContainer>
        <Heading as={'h5'} weight={'bold'}>
          Jogadores mais ativos
        </Heading>

        <Select
          options={[
            {
              label: '12/10/2023',
              value: '1702177200000',
            },
          ]}
          defaultValue={'1702177200000'}
          width={'$40'}
          height={'$10'}
          outlined={false}
        />
      </TitleContainer>

      {players.length > 0 ? (
        <ActiveListContainer>
          {players
            .filter((_, index) => showMore || index < 4)
            .map((player, index) => (
              <Player {...player} key={index} />
            ))}
        </ActiveListContainer>
      ) : (
        <Heading as={'h5'} color={'$neutral100'}>
          Nenhum jogador online.
        </Heading>
      )}

      {isNeedShowMore && (
        <Button
          css={{ alignSelf: 'center' }}
          size={'lg'}
          outlined
          onClick={toggleShowMore}
        >
          {!showMore ? 'Carregar Mais' : 'Carregar Menos'}
        </Button>
      )}
    </ActivePlayersContainer>
  )
}

const PlayerContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  padding: '$2 0',
})

const AvatarImage = styled(Image, {
  borderRadius: '$full',

  size: '$8',
})

const NameText = styled(Text, {
  flex: 1,

  maxWidth: '100%',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
})

const Player = ({ name, avatarURL }: ServersType.PlayerObject): JSX.Element => {
  return (
    <PlayerContainer>
      <AvatarImage
        src={avatarURL}
        alt={'Player avatar'}
        width={56}
        height={56}
      />

      <NameText size={'sm'} weight={'bold'} css={{ flex: 1 }}>
        {name}
      </NameText>

      <Text size={'sm'}>Jogou por 5h 53 m 96s</Text>
    </PlayerContainer>
  )
}
