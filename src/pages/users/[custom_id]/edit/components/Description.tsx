/* eslint-disable no-undef */
import { DescriptionDialog } from '@/components/Dialogs/Description'
import { EditLink } from '@/components/EditLinks'
import { styled } from '@/styles'
import { trpc } from '@/utils/trpc'
import { Button, Heading, Text } from '@5list-design-system/react'
import Link from 'next/link'
import { useUserEditor } from '../providers/UserEditorProvider'

interface DescriptionProps {
  text: string
  hasVip: boolean
}

const DescriptionWrapper = styled('div', {
  minHeight: '10.75rem',

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
  gap: '$6',
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
  const { refreshUser } = useUserEditor()
  const setUserBanner = trpc.users.setUserDescription.useMutation()

  const handleOnChangeDescription = async (description: string): Promise<void> => {
    await setUserBanner.mutateAsync({ description })

    await refreshUser()
  }

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
              trigger={
                <EditLink text={'Editar descrição'} />
              }
              onChange={handleOnChangeDescription}
            />
          )}
        </TitleContainer>

        <Text size={'sm'}>{text}</Text>
      </DescriptionContainer>

      {!hasVip && (
        <DescriptionBlurContainer>
          <Link href={'/premium/users'} legacyBehavior>
            <Button css={{ padding: '0 4.5rem' }} size={'lg'}>
              Obtenha o Premium
            </Button>
          </Link>
        </DescriptionBlurContainer>
      )}
    </DescriptionWrapper>
  )
}
