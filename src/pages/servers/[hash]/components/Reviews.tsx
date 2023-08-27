/* eslint-disable no-undef */
import { styled } from '@/styles'
import { Button, Heading, Text } from '@5list-design-system/react'
import { useState } from 'react'

import { ReplyDialog } from './ReplyDialog'
import { Review } from './Review'
import { ReviewDialog } from './ReviewDialog'

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

const ReviewBox = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$1',
})

const ReplyText = styled(Text, {
  width: 'fit-content',

  cursor: 'pointer',
  padding: '0.125rem $2',

  position: 'relative',
  left: '4.625rem',

  '&:hover': {
    color: '$neutral100 !important',
    transition: 'color 200ms',
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

        <ReviewDialog trigger={<Button>Deixar avaliação</Button>} />
      </TitleContainer>

      {reviews.length > 0 ? (
        <ReviewsList>
          {reviews
            .filter((_, index) => showMore || index < 4)
            .map((review, index) => (
              <ReviewBox key={index}>
                <Review {...review} />

                <ReplyDialog
                  review={review}
                  trigger={
                    <ReplyText size={'sm'} color={'$white'}>
                      Responder
                    </ReplyText>
                  }
                />
              </ReviewBox>
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
