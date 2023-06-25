/* eslint-disable no-undef */
import { CloudIcon } from '@/components/Icons'
import { styled } from '@/styles'
import { Text } from '@5list-design-system/react'
import { ChangeEventHandler } from 'react'

interface ImageUploaderProps {
  onFileSelected: (file: string) => void
}

const FileUploaderContainer = styled('div', {
  alignSelf: 'flex-end',

  width: '20.625rem',
  height: '8rem',

  background: '$white',
  border: '0.0625rem solid $gray200',
  borderRadius: '$lg',

  display: 'grid',
  gridTemplateRows: '1fr',
  gridTemplateColumns: '1fr',

  '& > *': {
    gridRow: 1,
    gridColumn: 1,
  },
})

const DragFileUploader = styled('input', {
  opacity: 0,

  width: '100%',
  height: '100%',

  '&::-webkit-file-upload-button': {
    display: 'none',
  },
})

const OverlayContainer = styled('div', {
  border: 'none',

  width: '100%',
  height: '100%',
  padding: '$4 $6',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$3',
})

const CloudCircle = styled('div', {
  size: '$10',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  background: '$gray100',
  border: '0.375rem solid $gray50',
  borderRadius: '$full',
})

const TextContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$1',
})

export const ImageUploader = ({
  onFileSelected,
}: ImageUploaderProps): JSX.Element => {
  const handleOnChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    onFileSelected(target.value)
  }

  return (
    <FileUploaderContainer>
      <OverlayContainer>
        <CloudCircle>
          <CloudIcon css={{ size: '$5', stroke: '$gray600' }} />
        </CloudCircle>

        <TextContainer>
          <Text size={'sm'} color={'$primary900'} weight={'normal'}>
            Clique para enviar{' '}
            <Text as={'span'} size={'xs'} color={'$neutral900'}>
              ou segure e solte aqui
            </Text>
          </Text>

          <Text size={'xs'} color={'$neutral900'}>
            PNG, JPG, GIF (max. 8mb)
          </Text>
        </TextContainer>
      </OverlayContainer>

      <DragFileUploader
        type={'file'}
        accept={'image/*'}
        onChange={handleOnChange}
      />
    </FileUploaderContainer>
  )
}
