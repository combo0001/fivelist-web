/* eslint-disable no-undef */
import { styled } from '@/styles'
import { Button, Heading, Text } from '@5list-design-system/react'
import Link from 'next/link'
import { useState } from 'react'

interface DescriptionProps {
  text: string
  hasVip: boolean
}

const DescriptionWrapper = styled('div', {
  minHeight: '11.25rem',

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
  gap: '$3',
})

const DescriptionText = styled(Text, {
  textOverflow: 'clip',

  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  textJustify: 'inter-character',
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
  const [showMore, setShowMore] = useState<boolean>(false)

  const toggleMode = (): void => {
    setShowMore((state) => !state)
  }

  return (
    <DescriptionWrapper>
      <DescriptionContainer>
        <Heading as={'h5'} weight={'bold'}>
          Descrição
        </Heading>

        <DescriptionText size={'sm'}>
          {showMore ? text : text.substring(0, 128)}

          {text.length > 128 && (
            <>
              {!showMore && '...'}
              <Text
                as={'span'}
                size={'sm'}
                color={'$white'}
                css={{ cursor: 'pointer', marginLeft: '$3' }}
                onClick={toggleMode}
              >
                {showMore ? 'Mostrar menos' : 'Mostrar mais'}
              </Text>
            </>
          )}
        </DescriptionText>
      </DescriptionContainer>

      {!hasVip && (
        <DescriptionBlurContainer>
          <Link href={'/premium/servers'} legacyBehavior>
            <Button size={'lg'}>Servidor sem Premium</Button>
          </Link>
        </DescriptionBlurContainer>
      )}
    </DescriptionWrapper>
  )
}
