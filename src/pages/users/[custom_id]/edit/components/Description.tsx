/* eslint-disable no-undef */
import { DescriptionDialog } from '@/components/Dialogs/Description'
import { EditLink } from '@/components/EditLinks'
import { styled } from '@/styles'
import { trpc } from '@/utils/trpc'
import { Button, Heading, Text } from '@5list-design-system/react'
import Link from 'next/link'
import { useUserEditor } from '../providers/UserEditorProvider'
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

  const { user, refreshUser } = useUserEditor()
  const setUserDescription = trpc.users.setUserDescription.useMutation()

  const hasVip = user.planTier.privileges.PROFILE_DESCRIPTION
  const text =
    hasVip && user.page.description
      ? user.page.description
      : t('usersPageEdit.descriptionSection.withoutDescription')

  const handleOnChangeDescription = async (
    description: string,
  ): Promise<void> => {
    await setUserDescription.mutateAsync({ description })

    await refreshUser()
  }

  return (
    <DescriptionWrapper>
      <DescriptionContainer>
        <Heading as={'h5'} weight={'bold'}>
          {t('usersPageEdit.descriptionSection.title')}
        </Heading>

        <Text size={'sm'}>{text}</Text>
      </DescriptionContainer>

      {hasVip && (
        <DescriptionDialog
          defaultValue={text}
          trigger={
            <EditContainer
              text={t('usersPageEdit.descriptionSection.editButton')}
            />
          }
          onChange={handleOnChangeDescription}
        />
      )}

      {!hasVip && (
        <DescriptionBlurContainer>
          <Link href={`/users/${user.customId}/premium`} legacyBehavior>
            <Button css={{ padding: '0 4.5rem' }} size={'lg'}>
              {t('usersPageEdit.descriptionSection.withoutPremium')}
            </Button>
          </Link>
        </DescriptionBlurContainer>
      )}
    </DescriptionWrapper>
  )
}
