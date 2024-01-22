import { UserConnectionsListSchemaType } from '@/schemas/users/ConnectionsSchema'
import {
  ConnectionDialog,
  ConnectionOptionsType,
} from '@/components/Dialogs/Connection'
import { AddLink } from '@/components/EditLinks'
import { DiscordIcon, SteamIcon, WorldIcon } from '@/components/Icons'
import { styled } from '@/styles'
import { Button, Heading, Text } from '@5list-design-system/react'
import { useTranslation } from 'react-i18next'
import { ConnectionsSchemaType } from '@/schemas/ConnectionSchema'
import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/navigation'
import { getSocialMediaLink } from '@/utils/socialMediaLinks'

/* eslint-disable no-undef */
interface ConnectionsProps {
  connections: UserConnectionsListSchemaType
}

const ConnectionsContainer = styled('div', {
  minHeight: '9.25rem',

  padding: '$6',

  background: 'transparent',
  border: '0.0625rem solid $neutral800',
  borderRadius: '$lg',

  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
})

const ConnectionsList = styled('ul', {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '$4',

  '& > *': {
    flex: '1 0 34%',
    listStyleType: 'none',
  },
})

const PointsText = styled(Text, {
  color: '$success600',
  fontFeatureSettings: `'clig' off, 'liga' off'`,
})

const WebsiteLinkBox = styled('a', {
  textDecoration: 'none',

  cursor: 'pointer',

  display: 'flex',
  alignItems: 'center',
  gap: '$3',
})

export const ConnectionsLinks = ({
  connections,
}: ConnectionsProps): JSX.Element => {
  const { t } = useTranslation('pages')
  const router = useRouter()

  const AVAILABLE_CONNECTIONS = [
    {
      name: 'Steam',
      icon: <SteamIcon css={{ size: '$8', fill: '$white' }} />,
      connection: 'STEAM',
    },
    {
      name: 'Discord',
      icon: <DiscordIcon css={{ size: '$8', fill: '$white' }} />,
      connection: 'DISCORD',
    },
  ] as ConnectionOptionsType[]

  const getAuthService = trpc.users.getAuthService.useMutation()

  const onAuth = async (connection: ConnectionsSchemaType): Promise<void> => {
    const redirectURL = await getAuthService.mutateAsync({ connection })

    if (redirectURL) router.push(redirectURL)
  }

  return (
    <ConnectionsContainer>
      <Heading as={'h4'} weight={'bold'}>
        {t('usersPageEdit.connectionsSection.title')}
      </Heading>

      <ConnectionsList>
        {connections.map(({ connection, identifier }) => {
          const connectionURL = getSocialMediaLink(connection, identifier)

          return (
            <WebsiteLinkBox
              href={connectionURL}
              target={'_blank'}
              key={connection}
            >
              <Button variation={'icon'} size={'sm'}>
                <WorldIcon css={{ fill: '$white', size: '$6' }} />
              </Button>

              <Text
                size={'sm'}
                color={'$white'}
                weight={'bold'}
                css={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
              >
                {connection[0] + connection.substring(1).toLowerCase()}

                <PointsText as={'span'} size={'xs'} color={'$sucess600'}>
                  &nbsp;+ 10{' ' + t('usersPageEdit.levelLabels.points')}
                </PointsText>
              </Text>
            </WebsiteLinkBox>
          )
        })}

        <ConnectionDialog
          title={t('usersPageEdit.connectionsSection.addConnection')}
          options={AVAILABLE_CONNECTIONS}
          onAuth={onAuth}
          trigger={
            <AddLink
              text={t('usersPageEdit.connectionsSection.addConnection')}
            />
          }
        />
      </ConnectionsList>
    </ConnectionsContainer>
  )
}
