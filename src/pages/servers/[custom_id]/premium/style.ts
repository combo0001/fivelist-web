import { styled } from '@/styles'
import Image from 'next/image'

export const PremiumWrapper = styled('section', {
  gridColumn: '1 / 3 !important',
  maxHeight: '100%',

  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: '1fr',

  '& > *': {
    gridRow: 1,
    gridColumn: 1,
  },
})

export const PremiumContainer = styled('section', {
  padding: '3.75rem 0 $12 0',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$12',

  overflow: 'auto',
  scrollbarWidth: 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },

  '& > *': {
    flexShrink: 0,
  },
})

export const PremiumImage = styled(Image, {
  pointerEvents: 'none',

  width: '100%',
  height: '49rem',
})