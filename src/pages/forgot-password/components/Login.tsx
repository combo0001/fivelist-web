import { Button, Text } from '@5list-design-system/react'
import { ComponentProps, ElementType } from 'react'

interface SigninButtonProps extends ComponentProps<typeof Button> {
  as?: ElementType
}

// eslint-disable-next-line no-undef
export function SigninButton(props: SigninButtonProps): JSX.Element {
  return (
    <Button type={'button'} size={'lg'} outlined {...props}>
      <Text weight={'regular'} size={'sm'} color={'inherit'}>
        Lembrei minha senha, &nbsp;
        <Text
          as={'span'}
          weight={'bold'}
          size={'sm'}
          color={'inherit'}
          css={{ textDecoration: 'underline' }}
        >
          Acessar
        </Text>
      </Text>
    </Button>
  )
}
