import {
  Back,
  Background,
  Box,
  Header,
  InputContainer,
  Error,
  Success,
} from '@/components/Auth'
import { Button, Text, TextInput } from '@5list-design-system/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { LoginButton } from './components/Login'
import { Form } from './style'

const ForgotPasswordSchema = z.object({
  email: z.string({ required_error: 'Campo vazio' }).email('E-mail inválido'),
})

type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>

// eslint-disable-next-line no-undef
export default function ForgotPassword(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful, submitCount },
  } = useForm<ForgotPasswordSchemaType>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const handleOnSubmit = (data: ForgotPasswordSchemaType): void => {}

  return (
    <Background>
      <Box>
        <Link href={'/'}>
          <Back />
        </Link>

        <Form onSubmit={handleSubmit(handleOnSubmit)} action="">
          <Header
            title={'Recuperar conta'}
            subtitle={'Enviaremos um link de alteração em seu e-mail.'}
          />

          <InputContainer>
            <TextInput
              sufixIcon={
                errors.email ? <Error /> : submitCount > 0 && <Success />
              }
              autoComplete={'email'}
              placeholder={'Digite seu e-mail'}
              spellCheck={false}
              disabled={isSubmitting || isSubmitSuccessful}
              outlined
              {...register('email', { required: true })}
            />

            {errors.email && (
              <Text color={'$colors$error600'} weight={'regular'} size={'xs'}>
                {errors.email.message}
              </Text>
            )}
          </InputContainer>

          <Button type={'submit'} size={'lg'}>
            Enviar link
          </Button>
        </Form>

        <Link href={'/login'} legacyBehavior>
          <LoginButton />
        </Link>
      </Box>
    </Background>
  )
}
