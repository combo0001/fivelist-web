/* eslint-disable no-undef */
import { DescriptionDialog } from '@/components/Dialogs/Description'
import { EditLink } from '@/components/EditLinks'
import { styled } from '@/styles'
import { trpc } from '@/utils/trpc'
import { Button, Heading, Text } from '@5list-design-system/react'
import Link from 'next/link'
import { useServerEditor } from '../providers/ServerEditorProvider'

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
  gap: '$4',
})

const DescriptionBlurContainer = styled('div', {
  background: 'rgba(29, 29, 29, 0.25)',
  backdropFilter: 'blur(0.125rem)',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const EditContainer = styled(EditLink, {
  justifySelf: 'flex-end',
  alignSelf: 'flex-start',

  margin: '$9 $6',
})

export const Description = ({
  text,
  hasVip,
}: DescriptionProps): JSX.Element => {
  const { serverToEdit, refreshServer } = useServerEditor()
  const setServerDescription = trpc.servers.setServerDescription.useMutation()

  const handleOnChangeDescription = async (
    description: string,
  ): Promise<void> => {
    await setServerDescription.mutateAsync({ 
      joinId: serverToEdit.joinId,
      pageId: serverToEdit.page.id,
      description 
    })

    await refreshServer()
  }

  return (
    <DescriptionWrapper>
      <DescriptionContainer>
        <Heading as={'h5'} weight={'bold'}>
          Descrição
        </Heading>

        <Text size={'sm'}>{text}</Text>
      </DescriptionContainer>

      {hasVip && (
        <DescriptionDialog
          defaultValue={text}
          trigger={<EditContainer text={'Editar descrição'} />}
          onChange={handleOnChangeDescription}
        />
      )}

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
