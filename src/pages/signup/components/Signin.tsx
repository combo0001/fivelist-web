import { useTranslation } from 'react-i18next'
import { Button, Text } from '@5list-design-system/react'
import { ComponentProps, ElementType } from 'react'

interface SignInButtonProps extends ComponentProps<typeof Button> {
  as?: ElementType
}

// eslint-disable-next-line no-undef
export function SignInButton(props: SignInButtonProps): JSX.Element {
  const { t } = useTranslation('pages')

  return (
    <Button type={'button'} size={'lg'} outlined {...props} css={{ flex: 1 }}>
      <Text weight={'regular'} size={'sm'} color={'inherit'}>
        {t('signup.signInButton')}{' '}
        <Text
          as={'span'}
          weight={'bold'}
          size={'sm'}
          color={'inherit'}
          css={{ textDecoration: 'underline' }}
        >
          {t('signup.signInLabel')}
        </Text>
      </Text>
    </Button>
  )
}
