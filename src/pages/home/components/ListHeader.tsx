/* eslint-disable no-undef */
import TrevorBackgroundImage from '@/assets/trevor.png'
import { Tag as InfoTag } from '@/components/Tag'
import { styled } from '@/styles'
import { Heading, Text } from '@5list-design-system/react'

const HeaderWrapper = styled('section', {
  width: '100%',
  height: '14rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  padding: '$4',

  background: `linear-gradient(270deg, $neutral900 25%, transparent 50%), url('${TrevorBackgroundImage.src}'), rgba(0, 0, 0, 0.675)`,
  backgroundSize: '100% 100%, 90% 100%',
  backgroundRepeat: 'no-repeat',
  backgroundBlendMode: 'normal, overlay',

  filter: 'drop-shadow(0 $space$1 $space$1 rgba(0, 0, 0, 0.25))',
})

const OnlineContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',

  '& > *:first-child': {
    marginBottom: '$2',
  },
})

const Tag = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: 'fit-content',
  height: '$6',
  padding: '0 $2',

  background: '$primary900',
  borderRadius: '$xs',
})

const InformationsContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',
})

export const ListHeader = (props: any): JSX.Element => {
  return (
    <HeaderWrapper>
      <OnlineContainer>
        <Tag>
          <Text size={'xs'} weight={'bold'} color={'$white'}>
            PC
          </Text>
        </Tag>

        <Heading as={'h4'} weight={'bold'}>
          Grand Theft Auto V
        </Heading>

        <InformationsContainer>
          <InfoTag active>138 Servidores</InfoTag>

          <InfoTag active>13.346 Jogadores Online</InfoTag>
        </InformationsContainer>
      </OnlineContainer>
    </HeaderWrapper>
  )
}
