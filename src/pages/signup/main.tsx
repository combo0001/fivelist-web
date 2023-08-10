import {
  Back,
  Background,
  Box,
  Error,
  Header,
  InputContainer,
  Success,
} from '@/components/Auth'
import { useClientUser } from '@/providers/UserProvider'
import { Button, Checkbox, Text, TextInput } from '@5list-design-system/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { SigninButton } from './components/Signin'
import {
  ButtonsContainer,
  CheckContainer,
  Form,
  InputsContainer,
} from './style'
import {
  SignUpRequestSchema,
  SignUpRequestSchemaType,
} from '@/lib/schemas/SignUpSchema'
import { useState } from 'react'

// eslint-disable-next-line no-undef
export const SignupMain = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, submitCount, isSubmitting, isSubmitSuccessful },
  } = useForm<SignUpRequestSchemaType>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: zodResolver(SignUpRequestSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })
  const [termsCheck, setTermsCheck] = useState<boolean>(false)

  const { signUp } = useClientUser()

  const handleOnSubmit = async (
    data: SignUpRequestSchemaType,
  ): Promise<void> => {
    if (!termsCheck) return

    try {
      await signUp(data.name, data.email, data.password)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Background>
      <Box>
        <Link href={'/'}>
          <Back />
        </Link>

        <Form onSubmit={handleSubmit(handleOnSubmit)} action="">
          <Header title={'Criar conta'} />

          <InputsContainer>
            <InputContainer>
              <TextInput
                sufixIcon={
                  errors.name ? <Error /> : submitCount > 0 && <Success />
                }
                spellCheck={false}
                placeholder={'Digite seu nome'}
                disabled={isSubmitting || isSubmitSuccessful}
                outlined
                {...register('name')}
              />

              {errors.name && (
                <Text color={'$colors$error600'} weight={'regular'} size={'xs'}>
                  {errors.name.message}
                </Text>
              )}
            </InputContainer>

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
                {...register('email')}
              />

              {errors.email && (
                <Text color={'$colors$error600'} weight={'regular'} size={'xs'}>
                  {errors.email.message}
                </Text>
              )}
            </InputContainer>

            <InputContainer>
              <TextInput
                sufixIcon={
                  errors.password ? <Error /> : submitCount > 0 && <Success />
                }
                type={'password'}
                spellCheck={false}
                placeholder={'Digite sua senha'}
                disabled={isSubmitting || isSubmitSuccessful}
                outlined
                {...register('password')}
              />

              {errors.password && (
                <Text color={'$colors$error600'} weight={'regular'} size={'xs'}>
                  {errors.password.message}
                </Text>
              )}
            </InputContainer>

            <Text weight={'regular'} size={'sm'}>
              A senha deve ter mais de 8 caracteres e conter pelo menos uma
              letra maiúscula e um dígito numérico.
            </Text>
          </InputsContainer>

          <CheckContainer>
            <Checkbox
              checked={termsCheck}
              onCheckedChange={(value: boolean) => setTermsCheck(value)}
              variant={'circle'}
              css={{ '&:not(:disabled)': { cursor: 'pointer' } }}
            />

            <Text weight={'regular'} size={'sm'}>
              Aceito os termos de responsabilidade
            </Text>
          </CheckContainer>

          <ButtonsContainer>
            <Button type={'submit'} size={'lg'}>
              Criar conta
            </Button>

            <Link href={'/signin'} legacyBehavior>
              <SigninButton />
            </Link>
          </ButtonsContainer>
        </Form>
      </Box>
    </Background>
  )
}
