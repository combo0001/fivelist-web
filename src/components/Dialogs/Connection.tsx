/* eslint-disable no-undef */
import { ErrorIcon } from '@/components/Icons'
import { styled } from '@/styles'
import { Button, Text } from '@5list-design-system/react'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'

interface ConnectionOptionProps {
  label: string
  icon: React.ReactNode
  requestURL: string
}

interface ConnectionDialogProps {
  title: string
  trigger: React.ReactNode
  connections: ConnectionOptionProps[]
}

const ConnectionDialogOverlay = styled(Dialog.Overlay, {
  zIndex: 9999,

  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  width: '100%',
  height: '100%',

  background: 'rgba(0, 0, 0, 0.625)',
})

const ConnectionDialogContent = styled(Dialog.Content, {
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

const ConnectionsBox = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 7.125rem)',
  gridGap: '$6',
})

const ConnectionAnchor = styled('a', {
  all: 'unset',

  cursor: 'pointer',
  borderRadius: '$sm',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$4',

  padding: '$10 $2 $2 $2',
  backgroundColor: '$neutral700',
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

const ButtonContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
})

export const ConnectionDialog = ({
  title,
  trigger,
  connections,
}: ConnectionDialogProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false)

  const toggleOpen = (): void => {
    setOpen((state) => !state)
  }

  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger onClick={toggleOpen} asChild>
        {trigger}
      </Dialog.Trigger>

      <Dialog.Portal>
        <ConnectionDialogOverlay />

        <ConnectionDialogContent>
          <TitleContainer>
            <Text color={'$white'} weight={'normal'}>
              {title}
            </Text>

            <CloseButton onClick={toggleOpen}>
              <ErrorIcon css={{ size: '$6', fill: '$white' }} />
            </CloseButton>
          </TitleContainer>

          <Divisor />

          <ConnectionsBox>
            {connections
              .slice(0, 5)
              .map(({ label, icon, requestURL }, index) => (
                <ConnectionAnchor key={index} href={requestURL}>
                  {icon}

                  <Text size={'xs'} weight={'regular'}>
                    {label}
                  </Text>
                </ConnectionAnchor>
              ))}
          </ConnectionsBox>

          <ButtonContainer>
            <Dialog.Close asChild>
              <Button size={'lg'}>Salvar</Button>
            </Dialog.Close>
          </ButtonContainer>
        </ConnectionDialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
