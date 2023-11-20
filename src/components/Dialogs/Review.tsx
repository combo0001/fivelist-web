/* eslint-disable no-undef */
import { ErrorIcon, StarIcon } from '@/components/Icons'
import { styled } from '@/styles'
import { Button, Heading, Text } from '@5list-design-system/react'
import * as Dialog from '@radix-ui/react-dialog'
import { ChangeEventHandler, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface ReviewDialogProps {
  trigger: React.ReactNode
  onFinish?: (content: string, rate: number) => Promise<void> | void
}

type RateValueType = 0 | 1 | 2 | 3 | 4 | 5
type StepType = 'answer' | 'finish'

const ReviewDialogOverlay = styled(Dialog.Overlay, {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  width: '100%',
  height: '100%',

  background: 'rgba(0, 0, 0, 0.625)',
})

const ReviewDialogContent = styled(Dialog.Content, {
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

  '& > *:nth-child(3)': {
    maxHeight: '$10',
  },
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

const StarsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
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

export const ReviewDialog = ({
  trigger,
  onFinish,
}: ReviewDialogProps): JSX.Element => {
  const { t } = useTranslation('dialogs')

  const [open, setOpen] = useState<boolean>(false)
  const [step, setStep] = useState<StepType>('answer')

  const [content, setContent] = useState<string>('')
  const [rate, setRate] = useState<RateValueType>(0)

  const toggleOpen = (): void => {
    setOpen((state) => !state)
  }

  const handleOnSend = async (): Promise<void> => {
    if (onFinish) {
      await onFinish(content, rate)
    }

    setStep('finish')
  }

  const handleOnFinish = (): void => {
    toggleOpen()
    setStep('answer')
  }

  const onRateChange = (value: RateValueType) => {
    setRate((currentValue) => (value !== currentValue ? value : 0))
  }

  const onContentChange: ChangeEventHandler<HTMLTextAreaElement> = ({
    target,
  }) => setContent(target.value)

  const reviewContent = (
    <>
      <Divisor />

      <StarsContainer>
        <ReviewRateInput value={rate} onChange={onRateChange} />

        <Text size={'sm'} color={'$white'}>
          {t('review.rateTitle')}
        </Text>
      </StarsContainer>

      <Divisor />

      <TextAreaContainer>
        <Text size={'sm'} color={'$white'}>
          {t('review.feedbackTitle')}
        </Text>

        <TextDescriptionBox
          placeholder={t('review.feedbackInput')}
          value={content}
          onChange={onContentChange}
          spellCheck={false}
        />
      </TextAreaContainer>

      <Dialog.Close onClick={handleOnSend} asChild>
        <Button size={'lg'}>{t('review.sendButton')}</Button>
      </Dialog.Close>
    </>
  )

  const finishContent = (
    <>
      <Heading as={'h4'} css={{ alignSelf: 'center', textAlign: 'center' }}>
        {t('review.thanksForFeedback')}
      </Heading>

      <Dialog.Close onClick={handleOnFinish} asChild>
        <Button size={'lg'} css={{ alignSelf: 'center' }}>
          {t('review.closeThanks')}
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
        <ReviewDialogOverlay />

        <ReviewDialogContent>
          <TitleContainer>
            <Text color={'$white'} weight={'normal'}>
              {t('review.feedbackInput')}
            </Text>

            <CloseButton onClick={toggleOpen}>
              <ErrorIcon css={{ size: '$6', fill: '$white' }} />
            </CloseButton>
          </TitleContainer>

          {step === 'answer' ? reviewContent : finishContent}
        </ReviewDialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

interface ReviewRateInputProps {
  value: RateValueType
  onChange: (value: RateValueType) => void
}

const StarsBox = styled('div', {
  display: 'flex',
  alignItems: 'center',
})

const RateStar = styled(StarIcon, {
  size: '$4',
  cursor: 'pointer',

  variants: {
    highlighted: {
      true: {
        fill: '$primary800',
      },
      false: {
        fill: '$neutral500',
      },
    },
  },

  defaultVariants: {
    highlighted: false,
  },
})

const ReviewRateInput = ({
  value,
  onChange,
}: ReviewRateInputProps): JSX.Element => {
  const starsList = []

  for (let starRate = 1; starRate < 6; starRate++) {
    starsList.push(
      <RateStar
        highlighted={value >= starRate}
        onClick={onChange.bind(null, starRate as RateValueType)}
      />,
    )
  }

  return <StarsBox>{starsList}</StarsBox>
}
