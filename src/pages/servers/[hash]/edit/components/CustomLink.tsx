/* eslint-disable no-undef */

import { styled } from '@/styles'
import { Button, Heading } from '@5list-design-system/react'
import { useRef, useState } from 'react'
import { EditLink } from '../utils/Links'
import { CopyIcon } from '@/components/Icons'

interface CustomLinkProps {
  id: string
}

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

export const CustomLink = ({ id }: CustomLinkProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>()

  const [customUrl, setCustomUrl] = useState<string>('fivelist.gg/' + id)
  const [isEditing, setEditing] = useState<boolean>(false)

  const toggleEditing = (): void => {
    if (!isEditing) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    }

    setEditing((state) => !state)
  }

  const handleOnChange = (value: string): void => {
    const isValid = value.startsWith('fivelist.gg/')

    if (isValid) {
      setCustomUrl(value)
    }
  }

  const handleOnCopy = (): void => {
    navigator.clipboard.writeText(customUrl)
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
        value={customUrl}
        onChange={({ target }) => handleOnChange(target.value)}
      />

      <Button onClick={handleOnCopy}>
        Copiar link
        <CopyIcon css={{ size: '$4', fill: '$white' }} />
      </Button>
    </CustomLinkContainer>
  )
}
