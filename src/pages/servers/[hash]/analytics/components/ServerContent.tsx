/* eslint-disable no-undef */
import { styled } from '@/styles'
import { PageViews } from './PageViews'

const ContentContainer = styled('section', {
  paddingTop: '$10',
  paddingBottom: '5.125rem',

  width: '94.5%',

  display: 'flex',
  gap: '$8',
})

const SectionLayout = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$8',

  height: 'fit-content',
})

const LargerSection = styled(SectionLayout, {
  width: '63.5%',
})

const SmallSection = styled(SectionLayout, {
  width: '36.5%',
})

export const ServerContent = (): JSX.Element => {
  return (
    <ContentContainer>
      <LargerSection>
        <PageViews />
      </LargerSection>

      <SmallSection></SmallSection>
    </ContentContainer>
  )
}