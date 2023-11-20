import { UserConnectionsListSchemaType } from '@/schemas/users/ConnectionsSchema'
import { ConnectionDialog } from '@/components/Dialogs/Connection'
import { AddLink } from '@/components/EditLinks'
import { WorldIcon } from '@/components/Icons'
import { styled } from '@/styles'
import {
  getAvailableConnections,
  getConnectionOptions,
} from '@/utils/connectionsLinks'
import { getBaseURL } from '@/utils/getBaseURL'
import { Button, Heading, Text } from '@5list-design-system/react'
import { useTranslation } from 'react-i18next'

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
  const availableConnections = getAvailableConnections()
  const { t } = useTranslation('pages')

  return (
    <ConnectionsContainer>
      <Heading as={'h4'} weight={'bold'}>
        {t('usersPageEdit.connectionsSection.title')}
      </Heading>

      <ConnectionsList>
        {connections.map(({ connection }) => {
          return (
            <WebsiteLinkBox href={''} target={'_blank'} key={connection}>
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
          connections={availableConnections.map((connection) => {
            const { getRequestURL, getPlatformIcon } =
              getConnectionOptions(connection)

            return {
              label: connection[0] + connection.substring(1).toLowerCase(),
              icon: getPlatformIcon(),
              requestURL: getRequestURL(
                typeof window !== 'undefined'
                  ? window.location.origin
                  : getBaseURL(),
              ),
            }
          })}
          trigger={<AddLink text={t('usersPageEdit.connectionsSection.addConnection')} />}
        />
      </ConnectionsList>
    </ConnectionsContainer>
  )
}
