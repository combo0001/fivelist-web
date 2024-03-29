/* eslint-disable no-undef */
import { ErrorIcon } from '@/components/Icons'
import { styled } from '@/styles'
import { Button, Heading, Text } from '@5list-design-system/react'
import * as Dialog from '@radix-ui/react-dialog'
import { ChangeEventHandler, useState } from 'react'

import { Review } from '../../pages/servers/[custom_id]/components/Review'
import { ServerReviewSchemaType } from '@/schemas/servers/ReviewsSchema'
import { useTranslation } from 'react-i18next'

interface ReplyDialogProps {
  trigger: React.ReactNode
  review: ServerReviewSchemaType
  onFinish?: (content: string) => Promise<void> | void
}

type StepType = 'answer' | 'finish'

const ReplyDialogOverlay = styled(Dialog.Overlay, {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  width: '100%',
  height: '100%',

  background: 'rgba(0, 0, 0, 0.625)',
})

const ReplyDialogContent = styled(Dialog.Content, {
  padding: '$6',

  width: '27.375rem',

  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  background: '$neutral800',
  borderRadius: '$lg',

  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
})

const TitleContainer = styled(Dialog.Title, {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const CloseButton = styled(Dialog.Close, {
  all: 'unset',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  cursor: 'pointer',
})

const Divisor = styled('div', {
  width: '100%',
  height: '0.0625rem',

  background: '$neutral700',
})

const TextAreaContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$1',
})

const TextDescriptionBox = styled('textarea', {
  all: 'unset',

  height: '6.875rem',
  padding: '$3',

  background: '$neutral700',
  borderRadius: '$lg',

  fontFamily: '$default',
  fontWeight: '$regular',
  fontSize: '$sm',
  lineHeight: '$base',

  color: '$neutral100',

  textJustify: 'inter-character',

  '&::placeholder': {
    color: '$neutral300',
  },

  '&::-webkit-scrollbar': {
    display: 'none',
  },
})

export const ReplyDialog = ({
  trigger,
  review,
  onFinish,
}: ReplyDialogProps): JSX.Element => {
  const { t } = useTranslation('dialogs')

  const [open, setOpen] = useState<boolean>(false)
  const [step, setStep] = useState<StepType>('answer')

  const [content, setContent] = useState<string>('')

  const toggleOpen = (): void => {
    setOpen((state) => !state)
  }

  const handleOnSend = async (): Promise<void> => {
    if (onFinish) {
      await onFinish(content)
    }

    setStep('finish')
  }

  const handleOnFinish = (): void => {
    toggleOpen()
    setStep('answer')
  }

  const onFeedbackChange: ChangeEventHandler<HTMLTextAreaElement> = ({
    target,
  }) => setContent(target.value)

  const reviewContent = (
    <>
      <Divisor />

      <Review review={review} hiddenAvatar />

      <Divisor />

      <TextAreaContainer>
        <Text size={'sm'} color={'$white'}>
          {t('reply.contentTitle')}
        </Text>

        <TextDescriptionBox
          placeholder={t('reply.contentInput')}
          value={content}
          onChange={onFeedbackChange}
          spellCheck={false}
        />
      </TextAreaContainer>

      <Dialog.Close onClick={handleOnSend} asChild>
        <Button size={'lg'}>{t('reply.sendButton')}</Button>
      </Dialog.Close>
    </>
  )

  const finishContent = (
    <>
      <Heading as={'h4'} css={{ alignSelf: 'center', textAlign: 'center' }}>
        {t('reply.thanksForReply')}
      </Heading>

      <Dialog.Close onClick={handleOnFinish} asChild>
        <Button size={'lg'} css={{ alignSelf: 'center' }}>
          {t('reply.closeThanks')}
        </Button>
      </Dialog.Close>
    </>
  )

  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger onClick={toggleOpen} asChild>
        {trigger}
      </Dialog.Trigger>

      <Dialog.Portal>
        <ReplyDialogOverlay />

        <ReplyDialogContent>
          <TitleContainer>
            <Text color={'$white'} weight={'normal'}>
              {t('reply.title')}, {review.user.name}
            </Text>

            <CloseButton onClick={toggleOpen}>
              <ErrorIcon css={{ size: '$6', fill: '$white' }} />
            </CloseButton>
          </TitleContainer>

          {step === 'answer' ? reviewContent : finishContent}
        </ReplyDialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
