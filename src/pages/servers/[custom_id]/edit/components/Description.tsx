import { DescriptionDialog } from '@/components/Dialogs/Description'
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { EditLink } from '@/components/EditLinks'
import { styled } from '@/styles'
import { Button, Heading, Text } from '@5list-design-system/react'
import Link from 'next/link'

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
})

const TitleContainer = styled('div', {
  userSelect: 'none',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
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
  return (
    <DescriptionWrapper>
      <DescriptionContainer>
        <TitleContainer>
          <Heading as={'h5'} weight={'bold'}>
            Descrição
          </Heading>

          {hasVip && (
            <DescriptionDialog
              defaultValue={text}
              trigger={<EditLink text={'Editar descrição'} />}
            />
          )}
        </TitleContainer>

        <Text size={'sm'}>{text}</Text>
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
