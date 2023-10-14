/* eslint-disable no-undef */
import { styled } from '@/styles'
import { Button, Heading, Text } from '@5list-design-system/react'
import { useEffect, useState } from 'react'

import { ReplyDialog } from '../../../../components/Dialogs/ReplyReview'
import { Review } from './Review'
import { ReviewDialog } from '../../../../components/Dialogs/Review'
import { useClientUser } from '@/providers/UserProvider'
import { useServerView } from '../providers/ServerViewProvider'
import Link from 'next/link'
import { Reply } from './Reply'

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

export const Reviews = (): JSX.Element => {
  const [reviewsAmount, setReviewsAmount] = useState<number>(0)
  const [isNeedShowMore, setNeedShowMore] = useState<boolean>(true)

  const { user } = useClientUser()
  const {
    serverView,
    serverReviews,
    createServerReplyOfReview,
    createServerReview,
    showMoreReviews,
  } = useServerView()

  const reviews = serverReviews || []
  const isUserOwnerOfServer =
    !!serverView.page.ownerUser && serverView.page.ownerUser.id === user?.id

  const handleOnCreateReview = async (
    content: string,
    rating: number,
  ): Promise<void> => {
    await createServerReview(content, rating)
  }

  const handleOnCreateReplyOfReview = async (
    reviewId: string,
    content: string,
  ): Promise<void> => {
    await createServerReplyOfReview(reviewId, content)
  }

  const handleOnShowMore = async (): Promise<void> => {
    await showMoreReviews()
  }

  useEffect(() => {
    if (!isNeedShowMore) return

    const newReviewsAmount = reviews.length

    if (newReviewsAmount > reviewsAmount) {
      setReviewsAmount(newReviewsAmount)
    } else {
      setNeedShowMore(false)
    }
  }, [reviews.length, reviewsAmount, isNeedShowMore])

  return (
    <ReviewsContainer>
      <TitleContainer>
        <Heading as={'h5'}>Avaliações</Heading>

        {user ? (
          <ReviewDialog
            onFinish={handleOnCreateReview}
            trigger={<Button>Deixar avaliação</Button>}
          />
        ) : (
          <Link href={'/signin'} legacyBehavior>
            <Button>Deixar avaliação</Button>
          </Link>
        )}
      </TitleContainer>

      {reviews.length > 0 ? (
        <ReviewsList>
          {reviews.map((review, index) => (
            <>
              <ReviewBox key={index}>
                <Review review={review} />

                {review.replies.length === 0 && isUserOwnerOfServer && (
                  <ReplyDialog
                    review={review}
                    onFinish={handleOnCreateReplyOfReview.bind(null, review.id)}
                    trigger={
                      <ReplyText size={'sm'} color={'$white'}>
                        Responder
                      </ReplyText>
                    }
                  />
                )}
              </ReviewBox>

              {review.replies.map((reply, replyIndex) => (
                <Reply reply={reply} key={`${index}:${replyIndex}`} />
              ))}
            </>
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
          onClick={handleOnShowMore}
        >
          Carregar Mais
        </Button>
      )}
    </ReviewsContainer>
  )
}
