/* eslint-disable no-undef */

import { styled } from '@/styles'
import { Button, Heading } from '@5list-design-system/react'
import { useState } from 'react'

import { Activity } from './Activity'

interface RecentActivitiesProps {
  posts: any[]
}

const RecentContainer = styled('div', {
  height: 'fit-content',
  minHeight: '23.125rem',

  padding: '$6',

  display: 'flex',
  flexDirection: 'column',
  gap: '$8',

  border: '0.0625rem solid $neutral700',
  borderRadius: '$lg',

  '& > *:last-child': {
    marginTop: 'auto',
  },
})

const PostsList = styled('ol', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  '& > *': {
    listStyleType: 'none',
  },
})

export const RecentActivities = ({
  posts,
}: RecentActivitiesProps): JSX.Element => {
  const [showMore, setShowMore] = useState<boolean>(false)

  const toggleShowMore = () => setShowMore((status) => !status)

  const isNeedShowMore = posts.length > 4

  return (
    <RecentContainer>
      <Heading as={'h4'} weight={'bold'}>
        Últimas atividades
      </Heading>

      {posts.length > 0 ? (
        <PostsList>
          {posts
            .filter((_, index) => showMore || index < 4)
            .map((activity, index) => (
              <Activity key={index} {...activity} />
            ))}
        </PostsList>
      ) : (
        <Heading as={'h5'} color={'$neutral100'}>
          Nenhum streamer registrado.
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
    </RecentContainer>
  )
}
