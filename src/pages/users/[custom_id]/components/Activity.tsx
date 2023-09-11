/* eslint-disable no-undef */
import { UserPageSchemaType } from '@/schemas/users/PageSchema'
import { styled } from '@/styles'
import { Text } from '@5list-design-system/react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'

interface ActivityProps {
  page: UserPageSchemaType,
  message: string
  createdAt: string
}

const ActivityContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '3.5rem 1fr',
  gridTemplateRows: '1fr',
  gridGap: '1.125rem',
})

const AvatarImage = styled(Image, {
  width: '100%',
  aspectRatio: 1,

  borderRadius: '$full',
})

const ActivityMessageContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
})

const MessageText = styled(Text, {
  maxWidth: '100%',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
})

export const Activity = ({
  page,
  message,
  createdAt,
}: ActivityProps): JSX.Element => {
  return (
    <ActivityContainer>
      <AvatarImage
        src={page.avatarURL ?
          page.avatarURL
          : 'https://cdn.discordapp.com/attachments/923436122871308308/1120117167925501982/image.png'
        }
        alt={'Avatar do perfil'}
        width={56}
        height={56}
      />

      <ActivityMessageContainer>
        <Text size={'xs'} color={'$neutral200'}>
          Publicado{' '}
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: ptBR })}
        </Text>

        <MessageText size={'sm'} color={'$white'}>
          {message}
        </MessageText>
      </ActivityMessageContainer>
    </ActivityContainer>
  )
}
