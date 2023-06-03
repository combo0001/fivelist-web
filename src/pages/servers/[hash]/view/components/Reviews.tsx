/* eslint-disable no-undef */
import { styled } from '@/styles'
import { Button, Heading, Text } from '@5list-design-system/react'

import { ptBR } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'

import Image from 'next/image'
import { useState } from 'react'
import { StarIcon } from '@/components/Icons'

interface ReviewsProps {
  reviews: ServersType.ReviewsObject[]
}

const ReviewsContainer = styled('div', {
  minHeight: '9rem',
  height: 'fit-content',

  padding: '$6',

  display: 'flex',
  flexDirection: 'column',
  gap: '$8',

  border: '0.0625rem solid $neutral800',
  borderRadius: '$lg',
})

const TitleContainer = styled('section', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const ReviewsList = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',

  '& > *': {
    listStyleType: 'none',
  },
})

export const Reviews = ({ reviews }: ReviewsProps): JSX.Element => {
  const [showMore, setShowMore] = useState<boolean>(false)

  const toggleShowMore = () => setShowMore((status) => !status)

  const isNeedShowMore = reviews.length > 4

  return (
    <ReviewsContainer>
      <TitleContainer>
        <Heading as={'h5'}>Avaliações</Heading>

        <Button>Deixar avaliação</Button>
      </TitleContainer>

      {reviews.length > 0 ? (
        <ReviewsList>
          {reviews
            .filter((_, index) => showMore || index < 4)
            .map((review, index) => (
              <Review {...review} key={index} />
            ))}
        </ReviewsList>
      ) : (
        <Heading as={'h5'} color={'$neutral100'}>
          Nenhum depoimento.
        </Heading>
      )}

      {isNeedShowMore && (
        <Button
          css={{ marginTop: 'auto', alignSelf: 'center' }}
          size={'lg'}
          outlined
          onClick={toggleShowMore}
        >
          {!showMore ? 'Carregar Mais' : 'Carregar Menos'}
        </Button>
      )}
    </ReviewsContainer>
  )
}

const ReviewContainer = styled('li', {
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

const Review = ({
  author,
  message,
  rate,
  createdAt,
}: ServersType.ReviewsObject): JSX.Element => {
  return (
    <ReviewContainer>
      <AvatarImage
        src={author.avatarURL}
        alt={'Author avatar'}
        width={56}
        height={56}
      />

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
