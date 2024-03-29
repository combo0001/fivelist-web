/* eslint-disable no-undef */
import { DescriptionDialog } from '@/components/Dialogs/Description'
import { EditLink } from '@/components/EditLinks'
import { styled } from '@/styles'
import { trpc } from '@/utils/trpc'
import { Button, Heading, Text } from '@5list-design-system/react'
import Link from 'next/link'
import { useServerEditor } from '../providers/ServerEditorProvider'
import { useTranslation } from 'react-i18next'

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

export const Description = (): JSX.Element => {
  const { t } = useTranslation('pages')

  const { serverToEdit, refreshServer } = useServerEditor()
  const setServerDescription = trpc.servers.setServerDescription.useMutation()

  const hasVip = serverToEdit.page.planTier.privileges.PAGE_DESCRIPTION
  const text =
    hasVip && serverToEdit.page.description
      ? serverToEdit.page.description
      : t('serversPageEdit.descriptionSection.withoutDescription')

  const handleOnChangeDescription = async (
    description: string,
  ): Promise<void> => {
    await setServerDescription.mutateAsync({
      joinId: serverToEdit.joinId,
      pageId: serverToEdit.page.id,
      description,
    })

    await refreshServer()
  }

  return (
    <DescriptionWrapper>
      <DescriptionContainer>
        <Heading as={'h5'} weight={'bold'}>
          {t('serversPageEdit.descriptionSection.title')}
        </Heading>

        <Text size={'sm'}>{text}</Text>
      </DescriptionContainer>

      {hasVip && (
        <DescriptionDialog
          defaultValue={text}
          trigger={
            <EditContainer
              text={t('serversPageEdit.descriptionSection.editButton')}
            />
          }
          onChange={handleOnChangeDescription}
        />
      )}

      {!hasVip && (
        <DescriptionBlurContainer>
          <Link href={`/servers/${serverToEdit.joinId}/premium`} legacyBehavior>
            <Button css={{ padding: '0 4.5rem' }} size={'lg'}>
              {t('serversPageEdit.descriptionSection.withoutPremium')}
            </Button>
          </Link>
        </DescriptionBlurContainer>
      )}
    </DescriptionWrapper>
  )
}
