/* eslint-disable no-undef */
import { ErrorIcon } from '@/components/Icons'
import { styled } from '@/styles'
import { Button, Select, Text, TextInput } from '@5list-design-system/react'
import * as Dialog from '@radix-ui/react-dialog'
import { useRef, useState } from 'react'

type OptionRowProps = { label: string; value: string }

interface RestrictLinkDialogProps {
  title: string
  options: OptionRowProps[]
  trigger: React.ReactNode
  placeHolder?: string
  onSave?: (option: string, text: string) => Promise<void> | void
}

const RestrictLinkDialogOverlay = styled(Dialog.Overlay, {
  zIndex: 9999,

  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  width: '100%',
  height: '100%',

  background: 'rgba(0, 0, 0, 0.625)',
})

const RestrictLinkDialogContent = styled(Dialog.Content, {
  zIndex: 9999,

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

  overflow: 'visible',

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

const InputContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$1',
})

const ButtonContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
})

export const RestrictLinkDialog = ({
  title,
  placeHolder,
  options,
  trigger,
  onSave,
}: RestrictLinkDialogProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false)

  const [currentOption, setOption] = useState<OptionRowProps | undefined>()
  const textInput = useRef<HTMLInputElement>()

  const handleOnOptionSelected = (value: string) => {
    const optionSelected = options.find(
      ({ value: optionValue }) => value === optionValue,
    )

    if (optionSelected) setOption(optionSelected)
  }

  const toggleOpen = (): void => {
    setOpen((state) => !state)
    setOption(undefined)
  }

  const handleOnSave = async (): Promise<void> => {
    if (!currentOption) return

    if (onSave) {
      const inputElement = textInput.current

      if (inputElement) {
        await onSave(currentOption.value, inputElement.value)
      }
    }

    toggleOpen()
  }

  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger onClick={toggleOpen} asChild>
        {trigger}
      </Dialog.Trigger>

      <Dialog.Portal>
        <RestrictLinkDialogOverlay />

        <RestrictLinkDialogContent>
          <TitleContainer>
            <Text color={'$white'} weight={'normal'}>
              {title}
            </Text>

            <CloseButton onClick={toggleOpen}>
              <ErrorIcon css={{ size: '$6', fill: '$white' }} />
            </CloseButton>
          </TitleContainer>

          <Divisor />

          <Select
            options={options}
            width={'24.375rem'}
            height={'$10'}
            placeHolder="Selecione"
            onValueChange={handleOnOptionSelected}
            outlined
          />

          <InputContainer>
            <Text size={'sm'}>Link</Text>

            <TextInput
              ref={textInput as any}
              spellCheck={false}
              placeholder={placeHolder}
              outlined
            />
          </InputContainer>

          <ButtonContainer>
            <Dialog.Close onClick={handleOnSave} asChild>
              <Button size={'lg'}>Salvar</Button>
            </Dialog.Close>

            <Dialog.Close onClick={toggleOpen} asChild>
              <Button size={'lg'} outlined>
                Cancelar
              </Button>
            </Dialog.Close>
          </ButtonContainer>
        </RestrictLinkDialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
