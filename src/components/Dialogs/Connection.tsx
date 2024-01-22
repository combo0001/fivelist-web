/* eslint-disable no-undef */
import { ErrorIcon } from '@/components/Icons'
import { ConnectionsSchemaType } from '@/schemas/ConnectionSchema'
import { styled } from '@/styles'
import { Button, Text } from '@5list-design-system/react'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export interface ConnectionOptionsType {
  connection: ConnectionsSchemaType
  name: string
  icon: JSX.Element
}

interface ConnectionDialogProps {
  title: string
  trigger: React.ReactNode
  options: ConnectionOptionsType[]
  onAuth: (connection: ConnectionsSchemaType) => Promise<void>
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

const ConnectionButton = styled('button', {
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
  options,
  onAuth,
}: ConnectionDialogProps): JSX.Element => {
  const { t } = useTranslation('dialogs')
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
            {options.map(({ name, connection, icon }) => (
              <ConnectionButton
                key={connection}
                onClick={onAuth.bind(null, connection)}
              >
                {icon}

                <Text size={'xs'} weight={'regular'}>
                  {name}
                </Text>
              </ConnectionButton>
            ))}
          </ConnectionsBox>

          <ButtonContainer>
            <Dialog.Close asChild>
              <Button size={'lg'}>{t('connections.saveButton')}</Button>
            </Dialog.Close>
          </ButtonContainer>
        </ConnectionDialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
