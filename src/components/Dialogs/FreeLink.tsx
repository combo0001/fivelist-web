/* eslint-disable no-undef */
import { ErrorIcon } from '@/components/Icons'
import { styled } from '@/styles'
import { Button, Text, TextInput } from '@5list-design-system/react'
import * as Dialog from '@radix-ui/react-dialog'
import { useRef, useState } from 'react'

interface FreeLinkDialogProps {
  title: string
  trigger: React.ReactNode
  placeHolder?: string
  onSave?: (name: string, text: string) => Promise<void> | void
}

const FreeLinkDialogOverlay = styled(Dialog.Overlay, {
  zIndex: 9999,

  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  width: '100%',
  height: '100%',

  background: 'rgba(0, 0, 0, 0.625)',
})

const FreeLinkDialogContent = styled(Dialog.Content, {
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

export const FreeLinkDialog = ({
  title,
  placeHolder,
  trigger,
  onSave,
}: FreeLinkDialogProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false)

  const nameInput = useRef<HTMLInputElement>()
  const linkInput = useRef<HTMLInputElement>()

  const toggleOpen = (): void => {
    setOpen((state) => !state)
  }

  const handleOnSave = async (): Promise<void> => {
    if (onSave) {
      const nameInputElement = nameInput.current
      const linkInputElement = linkInput.current

      if (nameInputElement && linkInputElement) {
        await onSave(nameInputElement.value, linkInputElement.value)
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
        <FreeLinkDialogOverlay />

        <FreeLinkDialogContent>
          <TitleContainer>
            <Text color={'$white'} weight={'normal'}>
              {title}
            </Text>

            <CloseButton onClick={toggleOpen}>
              <ErrorIcon css={{ size: '$6', fill: '$white' }} />
            </CloseButton>
          </TitleContainer>

          <Divisor />

          <InputContainer>
            <Text size={'sm'}>Nome</Text>

            <TextInput
              ref={nameInput as any}
              spellCheck={false}
              placeholder={'Digite o nome'}
              outlined
            />
          </InputContainer>

          <InputContainer>
            <Text size={'sm'}>Link</Text>

            <TextInput
              ref={linkInput as any}
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
        </FreeLinkDialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
