/* eslint-disable no-undef */

import { styled } from '@/styles'
import { Heading } from '@5list-design-system/react'
import { ServerHighlighted } from './ServerHighlighted'

import ScrollContainer from 'react-indiana-drag-scroll'
import { useTranslation } from 'react-i18next'

interface ServersHighlightedProps {
  servers: ServersType.ServerObject[]
}

const ServersContainer = styled('div', {
  width: '100%',

  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
})

const ServersList = styled(ScrollContainer, {
  display: 'flex',
  gap: '0.625rem',
  alignItems: 'center',

  paddingBottom: '$5',

  '&::-webkit-scrollbar': {
    height: '$1',
  },

  '&::-webkit-scrollbar-track': {
    background: '$neutral800',
    borderRadius: '$md',
  },

  '&::-webkit-scrollbar-thumb': {
    background: '$neutral400',
    borderRadius: '$md',
  },

  '&::-webkit-scrollbar-thumb:hover': {
    background: '$neutral300',
  },
})

export const ServersHighlighted = ({
  servers,
}: ServersHighlightedProps): JSX.Element => {
  const { t } = useTranslation('pages')

  const serversContent = servers.map((server, index) => (
    <ServerHighlighted key={index} {...server} />
  ))

  return (
    <ServersContainer>
      <Heading as={'h5'} weight={'bold'}>
        {t('home.highlightedServersTitle')}
      </Heading>

      <ServersList vertical={false} hideScrollbars={false}>
        {serversContent}
      </ServersList>
    </ServersContainer>
  )
}
