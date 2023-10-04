/* eslint-disable no-undef */
import { StarIcon } from '@/components/Icons'
import { ServerReviewSchemaType } from '@/schemas/servers/ReviewsSchema'
import { styled } from '@/styles'
import { Text } from '@5list-design-system/react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'

interface ReviewProps {
  review: ServerReviewSchemaType
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
  review,
  hiddenAvatar,
}: ReviewProps): JSX.Element => {
  const reviewAuthorName = review.user.name.split(/\s/).shift()
  const reviewCreatedAt = new Date(review.createdAt)

  return (
    <ReviewContainer>
      {!hiddenAvatar && (
        <AvatarImage
          src={'https://cdn.discordapp.com/attachments/897332194811473951/1114657450491125801/image.png'}
          alt={'Author avatar'}
          width={56}
          height={56}
        />
      )}

      <ReviewMessageContainer>
        <Text size={'sm'} color={'$white'} weight={'bold'}>
          {reviewAuthorName},{' '}
          <Text as={'span'} size={'sm'} weight={'bold'}>
            {formatDistanceToNow(reviewCreatedAt, { addSuffix: true, locale: ptBR })}
          </Text>
        </Text>

        <StarsRate rate={review.rating} />

        <ReviewMessageContent>{review.content}</ReviewMessageContent>
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
