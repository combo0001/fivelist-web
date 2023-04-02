/* eslint-disable no-undef */
import { styled } from '@/styles'
import { Heading } from '@5list-design-system/react'
import { ComponentProps } from '@stitches/react'
import Image from 'next/image'
import { ElementType } from 'react'

import BackSvg from '../../assets/arrow-back.svg'
import AuthBackgroundImage from '../../assets/auth-background.png'
import { Background as BackgroundComponent, Container } from './style'

import CheckSvg from '@/assets/check.svg'
import ErrorSvg from '@/assets/error.svg'

interface AuthBackgroundProps
  extends ComponentProps<typeof BackgroundComponent> {
  as?: ElementType
}

export function Background({
  children,
  ...props
}: AuthBackgroundProps): JSX.Element {
  return (
    <BackgroundComponent {...props}>
      <Image
        src={AuthBackgroundImage}
        alt=""
        style={{ pointerEvents: 'none' }}
        fill
      />

      {children}
    </BackgroundComponent>
  )
}

export const Box = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$10',

  backgroundColor: '$neutral800',
  borderRadius: '$lg',

  padding: '$10',
})

export const Back = styled(BackSvg, {
  size: '$6',
  fill: '$neutral100',

  variants: {
    disabled: {
      true: {
        cursor: 'not-allowed',
      },
      false: {
        cursor: 'pointer',

        '&:hover': {
          fill: '$white',
          transition: 'all 200ms',
        },
      },
    },
  },

  defaultVariants: {
    disabled: false,
  },
})

interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps): JSX.Element {
  return (
    <Container>
      <Heading as={'h3'} weight={'bold'}>
        {title}
      </Heading>

      {subtitle && (
        <Heading color={'$colors$neutral100'} as={'h5'} weight={'regular'}>
          {subtitle}
        </Heading>
      )}
    </Container>
  )
}

export const InputContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$1',
})

export const Success = styled(CheckSvg, {
  size: '$6',
  fill: '$success600',
})

export const Error = styled(ErrorSvg, {
  size: '$6',
  fill: '$error600',
})
