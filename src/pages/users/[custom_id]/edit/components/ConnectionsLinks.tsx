import { UserConnectionsListSchemaType } from '@/@types/schemas/users/ConnectionsSchema'
import { ConnectionDialog } from '@/components/Dialogs/Connection'
import { AddLink } from '@/components/EditLinks'
import { DiscordIcon, WorldIcon } from '@/components/Icons'
import { styled } from '@/styles'
import { getAvailableConnections, getConnectionOptions } from '@/utils/connectionsLinks'
import { getBaseURL } from '@/utils/getBaseURL'
import { Button, Heading, Text } from '@5list-design-system/react'

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

  return (
    <ConnectionsContainer>
      <Heading as={'h4'} weight={'bold'}>
        Redes sociais
      </Heading>

      <ConnectionsList>
        {connections.map(({ connection, identifier }) => {
          return (
            <WebsiteLinkBox
              href={''}
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
              </Text>
            </WebsiteLinkBox>
          )
        })}

        <ConnectionDialog
          title={`Conectar plataforma`}
          connections={availableConnections.map((connection) => {
            const { getRequestURL, getPlatformIcon } = getConnectionOptions(connection)

            return {
              label: connection[0] + connection.substring(1).toLowerCase(),
              icon: getPlatformIcon(),
              requestURL: getRequestURL(typeof window !== 'undefined' ? window.location.origin : getBaseURL()),
            }
          })}
          trigger={<AddLink text={`Conectar plataforma`} />}
        />
      </ConnectionsList>
    </ConnectionsContainer>
  )
}
