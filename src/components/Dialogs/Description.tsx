/* eslint-disable no-undef */
import { ErrorIcon } from '@/components/Icons'
import { styled } from '@/styles'
import { Button, Text } from '@5list-design-system/react'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'

interface DescriptionDialogProps {
  defaultValue: string
  trigger: React.ReactNode
  onChange?: (value: string) => PromiseLike<void> | void
}

const DescriptionDialogOverlay = styled(Dialog.Overlay, {
  zIndex: 9999,

  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  width: '100%',
  height: '100%',

  background: 'rgba(0, 0, 0, 0.625)',
})

const DescriptionDialogContent = styled(Dialog.Content, {
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

const ButtonContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
})

export const DescriptionDialog = ({
  defaultValue,
  trigger,
  onChange,
}: DescriptionDialogProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false)
  const [description, setDescription] = useState<string>(defaultValue)

  const [isSaving, setSaving] = useState<boolean>(false)

  const toggleOpen = (): void => {
    setOpen((state) => !state)
  }

  const handleOnSave = async (): Promise<void> => {
    setSaving(true)

    if (onChange) {
      await onChange(description)
    }

    setSaving(false)
    toggleOpen()
  }

  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger onClick={toggleOpen} asChild>
        {trigger}
      </Dialog.Trigger>

      <Dialog.Portal>
        <DescriptionDialogOverlay />

        <DescriptionDialogContent>
          <TitleContainer>
            <Text color={'$white'} weight={'normal'}>
              Editar descrição
            </Text>

            <CloseButton onClick={toggleOpen}>
              <ErrorIcon css={{ size: '$6', fill: '$white' }} />
            </CloseButton>
          </TitleContainer>

          <Divisor />

          <TextAreaContainer>
            <Text size={'sm'} color={'$white'}>
              Digite o texto
            </Text>

            <TextDescriptionBox
              placeholder={'Digite a descrição do servidor.'}
              value={description}
              onChange={({ target }) =>
                !isSaving && setDescription(target.value)
              }
              spellCheck={false}
            />
          </TextAreaContainer>

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
        </DescriptionDialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
