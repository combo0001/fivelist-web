/* eslint-disable no-undef */
import { StarIcon } from '@/components/Icons'
import { styled } from '@/styles'
import { Text } from '@5list-design-system/react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'

interface ReviewProps extends ServersType.ReviewsObject {
  hiddenAvatar?: boolean
}

const ReviewContainer = styled('div', {
  display: 'flex',
  gap: '1.125rem',
})

const AvatarImage = styled(Image, {
  borderRadius: '$full',

  size: '3.5rem',
})

const ReviewMessageContainer = styled('div', {
  flex: 1,

  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
})

const ReviewMessageContent = styled(Text, {
  display: 'inline-block',

  width: 'fit-content',
  maxWidth: '100%',

  background: '$neutral700',
  borderRadius: '0 3rem 3rem 3rem',

  textJustify: 'inter-word',

  padding: '$3 $6',
})

export const Review = ({
  author,
  message,
  rate,
  createdAt,
  hiddenAvatar,
}: ReviewProps): JSX.Element => {
  return (
    <ReviewContainer>
      {!hiddenAvatar && (
        <AvatarImage
          src={author.avatarURL}
          alt={'Author avatar'}
          width={56}
          height={56}
        />
      )}

      <ReviewMessageContainer>
        <Text size={'sm'} color={'$white'} weight={'bold'}>
          {author.name},{' '}
          <Text as={'span'} size={'sm'} weight={'bold'}>
            {formatDistanceToNow(createdAt, { addSuffix: true, locale: ptBR })}
          </Text>
        </Text>

        <StarsRate rate={rate} />

        <ReviewMessageContent>{message}</ReviewMessageContent>
      </ReviewMessageContainer>
    </ReviewContainer>
  )
}

interface StarsRateProps {
  rate: number
}

const StarsContainer = styled('section', {
  display: 'flex',
})

const StarsRate = ({ rate }: StarsRateProps): JSX.Element => {
  const starsList = []

  for (let index = 0; index < 5; index++) {
    starsList.push(
      <StarIcon
        css={{
          size: '$4',
          fill: index + 1 <= rate ? '$primary800' : '$neutral700',
        }}
        key={index}
      />,
    )
  }

  return <StarsContainer>{starsList}</StarsContainer>
}
