/* eslint-disable no-undef */
import { EditLink } from '@/components/EditLinks'
import { CopyIcon } from '@/components/Icons'
import { styled } from '@/styles'
import { Button, Heading } from '@5list-design-system/react'
import { useRef, useState } from 'react'
import { useServerEditor } from '../providers/ServerEditorProvider'
import { trpc } from '@/utils/trpc'

const CustomLinkContainer = styled('div', {
  height: '$50',

  padding: '$6',

  background: '$neutral800',
  borderRadius: '$lg',

  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
})

const TitleContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const InputLink = styled('input', {
  all: 'unset',

  background: 'transparent',

  borderRadius: '1.25rem',
  border: '0.0625rem solid $neutral700',

  height: '$10',
  padding: '0 $4',

  fontFamily: '$default',
  fontWeight: '$regular',
  fontSize: '$sm',
  lineHeight: '$base',

  color: '$neutral100',
})

export const CustomLink = (): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>()

  const { serverToEdit, refreshServer } = useServerEditor()
  const setServerCustomId = trpc.servers.setServerCustomId.useMutation()

  const [customURL, setCustomURL] = useState<string>(
    'fivelist.gg/' + serverToEdit.page.customId,
  )
  const [isEditing, setEditing] = useState<boolean>(false)

  const toggleEditing = async (): Promise<void> => {
    if (!isEditing) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    } else {
      const savedCustomId = customURL.split('/').pop()

      if (savedCustomId) {
        await setServerCustomId.mutateAsync({
          joinId: serverToEdit.joinId,
          pageId: serverToEdit.page.id,
          customId: savedCustomId,
        })

        await refreshServer()
      }
    }

    setEditing((state) => !state)
  }

  const handleOnChange = (value: string): void => {
    const isValid = value.startsWith('fivelist.gg/')

    if (isValid) {
      setCustomURL(value)
    }
  }

  const handleOnCopy = (): void => {
    navigator.clipboard.writeText(customURL)
  }

  return (
    <CustomLinkContainer>
      <TitleContainer>
        <Heading as={'h4'} weight={'bold'}>
          Link Customizado
        </Heading>

        <EditLink
          onClick={toggleEditing}
          text={isEditing ? 'Confirmar edição' : 'Editar link'}
        />
      </TitleContainer>

      <InputLink
        ref={inputRef as any}
        disabled={!isEditing}
        value={customURL}
        onChange={({ target }) => handleOnChange(target.value)}
      />

      <Button onClick={handleOnCopy}>
        Copiar link
        <CopyIcon css={{ size: '$4', fill: '$white' }} />
      </Button>
    </CustomLinkContainer>
  )
}
