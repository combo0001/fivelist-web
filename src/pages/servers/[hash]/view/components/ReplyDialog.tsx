/* eslint-disable no-undef */
import { ErrorIcon } from '@/components/Icons'
import { styled } from '@/styles'
import { Button, Heading, Text } from '@5list-design-system/react'
import * as Dialog from '@radix-ui/react-dialog'
import { ChangeEventHandler, useState } from 'react'

import { Review } from './Review'

interface ReplyDialogProps {
  trigger: React.ReactNode
  review: ServersType.ReviewsObject
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
}: ReplyDialogProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false)
  const [step, setStep] = useState<StepType>('answer')

  const [feedback, setFeedback] = useState<string>('')

  const toggleOpen = (): void => {
    setOpen((state) => !state)
  }

  const handleOnSend = (): void => {
    setStep('finish')
  }

  const handleOnFinish = (): void => {
    toggleOpen()
  }

  const onFeedbackChange: ChangeEventHandler<HTMLTextAreaElement> = ({
    target,
  }) => setFeedback(target.value)

  const reviewContent = (
    <>
      <Divisor />

      <Review {...review} hiddenAvatar />

      <Divisor />

      <TextAreaContainer>
        <Text size={'sm'} color={'$white'}>
          Responder
        </Text>

        <TextDescriptionBox
          placeholder={'Digite a sua resposta.'}
          value={feedback}
          onChange={onFeedbackChange}
          spellCheck={false}
        />
      </TextAreaContainer>

      <Dialog.Close onClick={handleOnSend} asChild>
        <Button size={'lg'}>Enviar depoimento</Button>
      </Dialog.Close>
    </>
  )

  const finishContent = (
    <>
      <Heading as={'h4'} css={{ alignSelf: 'center', textAlign: 'center' }}>
        Obrigado por responder!
      </Heading>

      <Dialog.Close onClick={handleOnFinish} asChild>
        <Button size={'lg'} css={{ alignSelf: 'center' }}>
          Fechar
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
              Responder, {review.author.name}
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
