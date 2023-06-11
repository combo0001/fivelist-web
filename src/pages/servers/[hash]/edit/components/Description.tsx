/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { styled } from '@/styles'
import { Button, Heading } from '@5list-design-system/react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { EditLink } from '../utils/Links'

interface DescriptionProps {
  text: string
  hasVip: boolean
}

const DescriptionWrapper = styled('div', {
  minHeight: '11.25rem',

  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: '1fr',

  background: '$neutral800',
  borderRadius: '$lg',

  '& > *': {
    gridRow: 1,
    gridColumn: 1,
  },
})

const DescriptionContainer = styled('div', {
  padding: '$9 $6',

  display: 'flex',
  flexDirection: 'column',
  gap: '$3',

  overflow: 'hidden',
})

const TitleContainer = styled('div', {
  userSelect: 'none',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const DescriptionText = styled('textarea', {
  all: 'unset',

  fontFamily: '$default',
  fontWeight: '$regular',
  fontSize: '$sm',
  lineHeight: '$base',

  color: '$neutral100',

  textOverflow: 'clip',

  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  textJustify: 'inter-character',

  resize: 'none',

  '&::placeholder': {
    color: '$neutral300',
  },
})

const DescriptionBlurContainer = styled('div', {
  background: 'rgba(29, 29, 29, 0.25)',
  backdropFilter: 'blur(0.125rem)',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const Description = ({
  text,
  hasVip,
}: DescriptionProps): JSX.Element => {
  const textAreaRef = useRef<HTMLTextAreaElement>()

  const [isEditing, setEditing] = useState<boolean>(false)
  const [description, setDescription] = useState<string>(text)

  const startEdit = (): void => {
    setTimeout(() => {
      textAreaRef.current?.focus()
    }, 0)

    setEditing(true)
  }

  const confirmEdit = (): void => {
    console.log('EDIT: ' + description)

    setEditing(false)
  }

  const resizeTextArea = (): void => {
    const element = textAreaRef.current

    if (element) {
      element.style.height = '0'
      element.style.height = element.scrollHeight + 'px'
    }
  }

  useEffect(() => {
    if (textAreaRef.current) {
      resizeTextArea()
    }

    window.addEventListener('resize', resizeTextArea)

    return () => window.removeEventListener('resize', resizeTextArea)
  }, [textAreaRef, description, resizeTextArea])

  return (
    <DescriptionWrapper>
      <DescriptionContainer>
        <TitleContainer>
          <Heading as={'h5'} weight={'bold'}>
            Descrição
          </Heading>

          {hasVip && (
            <EditLink
              onClick={isEditing ? confirmEdit : startEdit}
              text={isEditing ? 'Confirmar edição' : 'Editar descrição'}
            />
          )}
        </TitleContainer>

        <DescriptionText
          ref={textAreaRef as any}
          placeholder={'Digite a descrição do servidor.'}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          disabled={!isEditing}
          spellCheck={false}
        />
      </DescriptionContainer>

      {!hasVip && (
        <DescriptionBlurContainer>
          <Link href={'/premium/servers'} legacyBehavior>
            <Button css={{ padding: '0 4.5rem' }} size={'lg'}>
              Obtenha o Premium
            </Button>
          </Link>
        </DescriptionBlurContainer>
      )}
    </DescriptionWrapper>
  )
}
