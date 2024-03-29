/* eslint-disable no-undef */
import { EditLink } from '@/components/EditLinks'
import { CopyIcon } from '@/components/Icons'
import { styled } from '@/styles'
import { Button, Heading } from '@5list-design-system/react'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface StreamLinkProps {
  streamURL: string
  onChange?: (value: string) => PromiseLike<void> | void
}

const StreamContainer = styled('div', {
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

export const StreamLink = ({
  streamURL,
  onChange,
}: StreamLinkProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>()

  const { t } = useTranslation('pages')

  const [customURL, setCustomURL] = useState<string>(streamURL)
  const [isEditing, setEditing] = useState<boolean>(false)

  const toggleEditing = async (): Promise<void> => {
    if (!isEditing) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    }

    if (onChange) {
      await onChange(customURL)
    }

    setEditing((state) => !state)
  }

  const handleOnChange = (value: string): void => {
    setCustomURL(value)
  }

  const handleOnCopy = (): void => {
    navigator.clipboard.writeText(customURL)
  }

  return (
    <StreamContainer>
      <TitleContainer>
        <Heading as={'h4'} weight={'bold'}>
          {t('usersPageEdit.liveSection.title')}
        </Heading>

        <EditLink
          onClick={toggleEditing}
          text={
            isEditing
              ? t('usersPageEdit.liveSection.confirmEdit')
              : t('usersPageEdit.liveSection.editLink')
          }
        />
      </TitleContainer>

      <InputLink
        ref={inputRef as any}
        disabled={!isEditing}
        value={customURL}
        onChange={({ target }) => handleOnChange(target.value)}
      />

      <Button onClick={handleOnCopy}>
        {t('usersPageEdit.liveSection.copyToClipboard')}
        <CopyIcon css={{ size: '$4', fill: '$white' }} />
      </Button>
    </StreamContainer>
  )
}
