/* eslint-disable no-undef */
import { styled } from '@/styles'
import { Text } from '@5list-design-system/react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'

interface ActivityProps {
  author: {
    avatarURL: string
  }
  message: string
  createdAt: Date
}

const ActivityContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1.125rem',
})

const AvatarImage = styled(Image, {
  borderRadius: '$full',

  size: '3.5rem',
})

const ActivityMessageContainer = styled('div', {
  flex: 1,

  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
})

export const Activity = ({
  author,
  message,
  createdAt,
}: ActivityProps): JSX.Element => {
  return (
    <ActivityContainer>
      <AvatarImage
        src={author.avatarURL}
        alt={'Author avatar'}
        width={56}
        height={56}
      />

      <ActivityMessageContainer>
        <Text size={'xs'} color={'$neutral200'}>
          Publicado{' '}
          {formatDistanceToNow(createdAt, { addSuffix: true, locale: ptBR })}
        </Text>

        <Text size={'sm'} color={'$white'}>
          {message}
        </Text>
      </ActivityMessageContainer>
    </ActivityContainer>
  )
}
