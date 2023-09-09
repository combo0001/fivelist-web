import { UserConnectionsListSchemaType } from '@/schemas/users/ConnectionsSchema'
import { ConnectionDialog } from '@/components/Dialogs/Connection'
import { WorldIcon } from '@/components/Icons'
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

  return (
    <ConnectionsContainer>
      <Heading as={'h4'} weight={'bold'}>
        Conexões
      </Heading>

      <ConnectionsList>
        {connections.map(({ connection }) => {
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

                <PointsText 
                  as={'span'}
                  size={'xs'}
                  color={'$sucess600'} 
                >
                  &nbsp;+ 10 pontos
                </PointsText>
              </Text>
            </WebsiteLinkBox>
          )
        })}
      </ConnectionsList>
    </ConnectionsContainer>
  )
}
