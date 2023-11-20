/* eslint-disable no-undef */
import { ServerReviewReplySchemaType } from '@/schemas/servers/ReviewsSchema'
import { styled } from '@/styles'
import { Text } from '@5list-design-system/react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useTranslation } from 'react-i18next'

interface ReplyProps {
  reply: ServerReviewReplySchemaType
}

const ReplyContainer = styled('div', {
  display: 'flex',
  gap: '1.125rem',

  marginLeft: '4.625rem',
})

const ReplyArrow = styled('div', {
  width: '1.25rem',
  height: '3.5rem',

  background: 'transparent',

  borderLeft: '0.15rem solid $neutral800',
  borderBottom: '0.15rem solid $neutral800',
})

const ReplyMessageContainer = styled('div', {
  flex: 1,

  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
})

const ReplyMessageContent = styled(Text, {
  display: 'inline-block',

  width: 'fit-content',
  maxWidth: '100%',

  background: '$neutral700',
  borderRadius: '0 3rem 3rem 3rem',

  textJustify: 'inter-word',

  padding: '$3 $6',
})

export const Reply = ({ reply }: ReplyProps): JSX.Element => {
  const { t } = useTranslation('pages')
  const replyCreatedAt = new Date(reply.createdAt)

  return (
    <ReplyContainer>
      <ReplyArrow />

      <ReplyMessageContainer>
        <Text size={'sm'} color={'$white'} weight={'bold'}>
          {t('serversPage.reviewsSection.adminReply')},{' '}
          <Text as={'span'} size={'sm'} weight={'bold'}>
            {formatDistanceToNow(replyCreatedAt, {
              addSuffix: true,
              locale: ptBR,
            })}
          </Text>
        </Text>

        <ReplyMessageContent>{reply.content}</ReplyMessageContent>
      </ReplyMessageContainer>
    </ReplyContainer>
  )
}
