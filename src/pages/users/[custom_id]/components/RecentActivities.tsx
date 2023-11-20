/* eslint-disable no-undef */

import { styled } from '@/styles'
import { Button, Heading } from '@5list-design-system/react'
import { useState } from 'react'

import { Activity } from './Activity'
import { UserActivitiesListSchemaType } from '@/schemas/users/ActivitySchema'
import { useUserView } from '../providers/UserViewProvider'
import { useTranslation } from 'react-i18next'

interface RecentActivitiesProps {
  activities: UserActivitiesListSchemaType
}

const RecentContainer = styled('div', {
  height: 'fit-content',

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
  activities,
}: RecentActivitiesProps): JSX.Element => {
  const { user } = useUserView()
  const { t } = useTranslation('pages')

  const AMOUNT_OF_POSTS_TO_SHOW = 2
  const [showMore, setShowMore] = useState<boolean>(false)

  const toggleShowMore = () => setShowMore((status) => !status)

  const isNeedShowMore = activities.length > AMOUNT_OF_POSTS_TO_SHOW

  return (
    <RecentContainer>
      <Heading as={'h4'} weight={'bold'}>
        {t('usersPage.lastActivitiesSection.title')}
      </Heading>

      {activities.length > 0 ? (
        <PostsList>
          {activities
            .filter((_, index) => showMore || index < AMOUNT_OF_POSTS_TO_SHOW)
            .map((activity, index) => (
              <Activity key={index} page={user.page} {...activity} />
            ))}
        </PostsList>
      ) : (
        <Heading as={'h5'} color={'$neutral100'}>
          {t('usersPage.lastActivitiesSection.withoutActivity')}
        </Heading>
      )}

      {isNeedShowMore && (
        <Button
          css={{ alignSelf: 'center' }}
          size={'lg'}
          outlined
          onClick={toggleShowMore}
        >
          {!showMore ? t('usersPage.lastActivitiesSection.loadMore') : t('usersPage.lastActivitiesSection.loadLess')}
        </Button>
      )}
    </RecentContainer>
  )
}
