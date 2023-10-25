'use client'

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
import { SignInSchema, SignInSchemaType } from '@/schemas/users/SignInSchema'
import { useClientUser } from '@/providers/UserProvider'
import {
  Button,
  Link as LinkComponent,
  Text,
  TextInput,
} from '@5list-design-system/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { SignUpButton } from './components/Signup'
import { Form, InputsContainer } from './style'
import { AuthError } from '@supabase/supabase-js'
import { useTranslation } from 'react-i18next'

export const SignInMain = (): JSX.Element => {
  const { i18n, t } = useTranslation('pages')
  
  const { user, signIn } = useClientUser()
  const router = useRouter()

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
  } = useForm<SignInSchemaType>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleOnSubmit = async ({
    email,
    password,
  }: SignInSchemaType): Promise<void> => {
    try {
      await signIn(email, password)

      router.push('/home')
    } catch (error) {
      setError('email', {
        type: 'INVALID_CREDENTIAL',
        message: (error as AuthError).message,
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
            title={t('signin.signIn')}
            subtitle={t('signin.signInWarn')}
          />

          <InputsContainer>
            <InputContainer>
              <TextInput
                sufixIcon={
                  errors.email ? <Error /> : submitCount > 0 && <Success />
                }
                disabled={isSubmitting || isSubmitSuccessful}
                autoComplete={'email'}
                placeholder={t('signin.signInInputs.email')}
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
                placeholder={t('signin.signInInputs.password')}
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
              <LinkComponent>{t('signin.forgotPassword')}</LinkComponent>
            </Link>
          </InputsContainer>

          <Button type={'submit'} size={'lg'}>
            {t('signin.signInButton')}
          </Button>
        </Form>

        <Link href={'/signup'} legacyBehavior>
          <SignUpButton />
        </Link>
      </Box>
    </Background>
  )
}
