/* eslint-disable no-undef */
import { styled } from '@/styles'
import { Button, Heading } from '@5list-design-system/react'
import { useState } from 'react'

import { Publication } from './Publication'

type PublicationObject = {
  author: {
    name: string
    avatarURL: string
  }
  message: string
  likes: number
  createdAt: Date
}

interface PublicationsProps {
  publications: PublicationObject[]
}

const PublicationsContainer = styled('div', {
  minHeight: '9rem',
  height: 'fit-content',

  padding: '$6',

  display: 'flex',
  flexDirection: 'column',
  gap: '$8',

  border: '0.0625rem solid $neutral800',
  borderRadius: '$lg',
})

const PublicationsList = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',

  '& > *': {
    listStyleType: 'none',
  },
})

export const Publications = ({
  publications,
}: PublicationsProps): JSX.Element => {
  const [showMore, setShowMore] = useState<boolean>(false)

  const toggleShowMore = () => setShowMore((status) => !status)

  const isNeedShowMore = publications.length > 4

  return (
    <PublicationsContainer>
      <Heading as={'h4'} weight={'bold'}>
        Publicações
      </Heading>

      {publications.length > 0 ? (
        <PublicationsList>
          {publications
            .filter((_, index) => showMore || index < 4)
            .map((publication, index) => (
              <Publication key={index} {...publication}></Publication>
            ))}
        </PublicationsList>
      ) : (
        <Heading as={'h5'} color={'$neutral100'}>
          Nenhuma publicação.
        </Heading>
      )}

      {isNeedShowMore && (
        <Button
          css={{ marginTop: 'auto', alignSelf: 'center' }}
          size={'lg'}
          outlined
          onClick={toggleShowMore}
        >
          {!showMore ? 'Carregar Mais' : 'Carregar Menos'}
        </Button>
      )}
    </PublicationsContainer>
  )
}
