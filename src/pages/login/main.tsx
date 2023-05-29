/* eslint-disable no-undef */
import {
  Back,
  Background,
  Box,
  Error,
  Header,
  InputContainer,
  Success,
} from '@/components/Auth'
import {
  Button,
  Link as LinkComponent,
  Text,
  TextInput,
} from '@5list-design-system/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { postLogin } from '../../services/auth'
import { SignupButton } from './components/Signup'
import { Form, InputsContainer } from './style'

import { useClientUser } from '@/providers/UserProvider'
import { useEffect } from 'react'

const LoginSchema = z.object({
  email: z.string().email('E-mail invalido.'),
  password: z.string(),
})

type LoginSchemaType = z.infer<typeof LoginSchema>

export const LoginMain = (): JSX.Element => {
  const router = useRouter()
  const { user } = useClientUser()

  useEffect(() => {
    if (user) {
      router.push('/home')
    }
  }, [user, router])

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, submitCount, isSubmitting, isSubmitSuccessful },
  } = useForm<LoginSchemaType>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleOnSubmit = async (data: LoginSchemaType): Promise<void> => {
    try {
      const isAuthorized = await postLogin(data)

      if (isAuthorized) {
        router.push('/')
      }
    } catch (error) {
      setError('password', {
        type: 'INVALID_CREDENTIALS',
        message: 'Senha incorreta tente outros credenciais.',
      })
    }
  }

  return (
    <Background>
      <Box>
        <Link href={'/'}>
          <Back />
        </Link>

        <Form onSubmit={handleSubmit(handleOnSubmit)} action="">
          <Header
            title={'Entrar'}
            subtitle={'Tenha acesso em nossa lista de servidores'}
          />

          <InputsContainer>
            <InputContainer>
              <TextInput
                sufixIcon={
                  errors.email ? <Error /> : submitCount > 0 && <Success />
                }
                disabled={isSubmitting || isSubmitSuccessful}
                autoComplete={'email'}
                placeholder={'Digite seu e-mail'}
                spellCheck={false}
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
                sufixIcon={errors.password ? <Error /> : undefined}
                disabled={isSubmitting || isSubmitSuccessful}
                type={'password'}
                spellCheck={false}
                placeholder={'Digite sua senha'}
                outlined
                {...register('password')}
              />

              {errors.password && (
                <Text color={'$colors$error600'} weight={'regular'} size={'xs'}>
                  {errors.password.message}
                </Text>
              )}
            </InputContainer>

            <Link href={'/forgot-password'} legacyBehavior>
              <LinkComponent>Esqueci minha senha</LinkComponent>
            </Link>
          </InputsContainer>

          <Button type={'submit'} size={'lg'}>
            Acessar agora
          </Button>
        </Form>

        <Link href={'/signup'} legacyBehavior>
          <SignupButton />
        </Link>
      </Box>
    </Background>
  )
}
