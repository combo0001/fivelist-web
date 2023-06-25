/* eslint-disable no-undef */
import { LikeOutlinedIcon } from '@/components/Icons'
import { styled } from '@/styles'
import { Text } from '@5list-design-system/react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'

interface PublicationProps {
  author: {
    name: string
    avatarURL: string
  }
  message: string
  likes: number
  createdAt: Date
}

const PublicationContainer = styled('div', {
  display: 'flex',
  gap: '1.125rem',
})

const AvatarImage = styled(Image, {
  borderRadius: '$full',

  size: '3.5rem',
})

const PublicationMessageContainer = styled('div', {
  flex: 1,

  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
})

const PublicationMessageContent = styled(Text, {
  display: 'inline-block',

  width: 'fit-content',
  maxWidth: '100%',

  background: '$neutral700',
  borderRadius: '0 3rem 3rem 3rem',

  textJustify: 'inter-word',

  padding: '$3 $6',
})

const LikesContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.625rem',
})

export const Publication = ({
  author,
  message,
  createdAt,
  likes,
}: PublicationProps): JSX.Element => {
  return (
    <PublicationContainer>
      <AvatarImage
        src={author.avatarURL}
        alt={'Author avatar'}
        width={56}
        height={56}
      />

      <PublicationMessageContainer>
        <Text size={'sm'} color={'$white'} weight={'bold'}>
          {author.name},{' '}
          <Text as={'span'} size={'sm'} weight={'bold'}>
            {formatDistanceToNow(createdAt, {
              addSuffix: true,
              locale: ptBR,
            })}
          </Text>
        </Text>

        <PublicationMessageContent>{message}</PublicationMessageContent>

        <LikesContainer>
          <LikeOutlinedIcon
            css={{ cursor: 'pointer', size: '$6', fill: '$error500' }}
          />

          <Text weight={'bold'} size={'xs'}>
            {likes} curtidas
          </Text>
        </LikesContainer>
      </PublicationMessageContainer>
    </PublicationContainer>
  )
}
