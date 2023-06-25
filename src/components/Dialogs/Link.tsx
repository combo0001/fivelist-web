/* eslint-disable no-undef */
import { ErrorIcon } from '@/components/Icons'
import { styled } from '@/styles'
import { Button, Select, Text, TextInput } from '@5list-design-system/react'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'

interface LinkDialogProps {
  title: string
  trigger: React.ReactNode
}

const LinkDialogOverlay = styled(Dialog.Overlay, {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  width: '100%',
  height: '100%',

  background: 'rgba(0, 0, 0, 0.625)',
})

const LinkDialogContent = styled(Dialog.Content, {
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

export const LinkDialog = ({
  title,
  trigger,
}: LinkDialogProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false)

  const toggleOpen = (): void => {
    setOpen((state) => !state)
  }

  const handleOnSave = (): void => {
    toggleOpen()
  }

  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger onClick={toggleOpen} asChild>
        {trigger}
      </Dialog.Trigger>

      <Dialog.Portal>
        <LinkDialogOverlay />

        <LinkDialogContent>
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
            options={[
              {
                label: 'Abril',
                value: '1702177200000',
              },
            ]}
            width={'24.375rem'}
            height={'$10'}
            placeHolder="Selecione"
            outlined
          />

          <InputContainer>
            <Text size={'sm'}>Link</Text>

            <TextInput
              spellCheck={false}
              placeholder={'Digite o link aqui'}
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
        </LinkDialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
