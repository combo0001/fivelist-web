import {
  Back,
  Background,
  Box,
  Error,
  Header,
  InputContainer,
  Success,
} from '@/components/Auth'
import { Button, Text, TextInput } from '@5list-design-system/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { SignInButton } from './components/SignIn'
import { Form } from './style'
import { useClientUser } from '@/providers/UserProvider'

const ForgotPasswordSchema = z.object({
  email: z.string({ required_error: 'Campo vazio' }).email('E-mail inválido'),
})

type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>

// eslint-disable-next-line no-undef
export const ForgotPasswordMain = (): JSX.Element => {
  const { forgotPassword } = useClientUser()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordSchemaType>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })
  const [cooldown, setCooldown] = useState<number>(0)

  const isInCooldown = cooldown > 0
  const isFormDisabled = isSubmitting || isInCooldown

  useEffect(() => {
    if (cooldown > 0) {
      setTimeout(() => setCooldown((current: number) => current - 1), 1000)
    }
  }, [cooldown])

  const handleOnSubmit = async ({
    email,
  }: ForgotPasswordSchemaType): Promise<void> => {
    await forgotPassword(email)

    setCooldown(60)
  }

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
              sufixIcon={errors.email ? <Error /> : isInCooldown && <Success />}
              autoComplete={'email'}
              placeholder={'Digite seu e-mail'}
              spellCheck={false}
              disabled={isFormDisabled}
              outlined
              {...register('email', { required: true })}
            />

            {errors.email && (
              <Text color={'$colors$error600'} weight={'regular'} size={'xs'}>
                {errors.email.message}
              </Text>
            )}
          </InputContainer>

          <Button type={'submit'} size={'lg'} disabled={isFormDisabled}>
            {isFormDisabled
              ? `Enviar novamente em ${cooldown}s`
              : 'Enviar link'}
          </Button>
        </Form>

        <Link href={'/signin'} legacyBehavior>
          <SignInButton />
        </Link>
      </Box>
    </Background>
  )
}
