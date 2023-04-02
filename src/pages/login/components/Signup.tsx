import { Button, Text } from '@5list-design-system/react'
import { ComponentProps, ElementType } from 'react'

interface SignupButtonProps extends ComponentProps<typeof Button> {
  as?: ElementType
}

// eslint-disable-next-line no-undef
export function SignupButton(props: SignupButtonProps): JSX.Element {
  return (
    <Button type={'button'} size={'lg'} outlined {...props}>
      <Text weight={'regular'} size={'sm'} color={'inherit'}>
        Ainda não tenho uma conta? &nbsp;
        <Text
          as={'span'}
          weight={'bold'}
          size={'sm'}
          color={'inherit'}
          css={{ textDecoration: 'underline' }}
        >
          Criar minha conta
        </Text>
      </Text>
    </Button>
  )
}
