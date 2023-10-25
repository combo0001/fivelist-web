import { Button, Text } from '@5list-design-system/react'
import { ComponentProps, ElementType } from 'react'
import { useTranslation } from 'react-i18next'

interface SignUpButtonProps extends ComponentProps<typeof Button> {
  as?: ElementType
}

// eslint-disable-next-line no-undef
export function SignUpButton(props: SignUpButtonProps): JSX.Element {
  const { t } = useTranslation('pages')

  return (
    <Button type={'button'} size={'lg'} outlined {...props}>
      <Text weight={'regular'} size={'sm'} color={'inherit'}>
        {t('signin.signUpButton')}{' '}
        <Text
          as={'span'}
          weight={'bold'}
          size={'sm'}
          color={'inherit'}
          css={{ textDecoration: 'underline' }}
        >
          {t('signin.signUpLabel')}
        </Text>
      </Text>
    </Button>
  )
}
