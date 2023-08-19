import { Button } from '@5list-design-system/react'
import { ComponentProps, ElementType } from 'react'

interface SignInButtonProps extends ComponentProps<typeof Button> {
  as?: ElementType
}

// eslint-disable-next-line no-undef
export function SignInButton(props: SignInButtonProps): JSX.Element {
  return (
    <Button type={'button'} size={'lg'} outlined {...props}>
      Ir para Home
    </Button>
  )
}
