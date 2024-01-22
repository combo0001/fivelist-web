'use client'

import {
  Back,
  Background,
  Box,
  Error,
  Header,
  InputContainer,
  Success,
} from '@/components/Auth'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { SignInButton } from './components/Signin'
import {
  ButtonsContainer,
  CheckContainer,
  Form,
  InputsContainer,
} from './style'
import {
  UserSignUpSchema,
  UserSignUpSchemaType,
} from '@/schemas/users/SignUpSchema'
import { useEffect, useReducer } from 'react'
import { Button, Checkbox, Text, TextInput } from '@5list-design-system/react'

import { useRouter } from 'next/navigation'
import { useClientUser } from '@/providers/UserProvider'
import { AuthError } from '@supabase/supabase-js'
import { useTranslation } from 'react-i18next'

interface TermsReducerProps {
  value: boolean
  hasError: boolean
}

const termsReducer = (
  prevState: TermsReducerProps,
  action: 'check' | 'uncheck' | 'error',
): TermsReducerProps => {
  switch (action) {
    case 'check':
      return {
        hasError: false,
        value: true,
      }
    case 'uncheck':
      return {
        hasError: false,
        value: false,
      }
    case 'error':
      return {
        ...prevState,
        hasError: true,
      }
    default:
      return prevState
  }
}

// eslint-disable-next-line no-undef
export const SignUpMain = (): JSX.Element => {
  const { t } = useTranslation('pages')

  const { user, signUp } = useClientUser()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/home')
    }
  }, [user, router])

  const {
    register,
    handleSubmit,
    formState: { errors, submitCount, isSubmitting, isSubmitSuccessful },
    setError,
    clearErrors,
  } = useForm<UserSignUpSchemaType>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: zodResolver(UserSignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const [terms, dispatchTerms] = useReducer<
    typeof termsReducer,
    TermsReducerProps
  >(
    termsReducer,
    {
      value: false,
      hasError: false,
    },
    (state: TermsReducerProps) => state,
  )
  const { value: termsCheck, hasError: termsError } = terms as TermsReducerProps

  const handleOnSubmit = async ({
    email,
    password,
    name,
  }: UserSignUpSchemaType): Promise<void> => {
    if (!termsCheck) {
      clearErrors()
      dispatchTerms('error')

      return
    }

    try {
      await signUp(email, password, name)

      router.push('/signup/success')
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
          <Header title={t('signup.createAccount')} />

          <InputsContainer>
            <InputContainer>
              <TextInput
                sufixIcon={
                  errors.name ? <Error /> : submitCount > 0 && <Success />
                }
                spellCheck={false}
                placeholder={t('signup.signUpInputs.fullName')}
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
                placeholder={t('signup.signUpInputs.email')}
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
                placeholder={t('signup.signUpInputs.password')}
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

            <Text
              weight={'regular'}
              size={'sm'}
              css={{ maxWidth: 'calc($80 + $10)' }}
            >
              {t('signup.passwordInstructions')}
            </Text>
          </InputsContainer>

          <CheckContainer>
            <Checkbox
              checked={termsCheck}
              onCheckedChange={(value: boolean) =>
                value ? dispatchTerms('check') : dispatchTerms('uncheck')
              }
              variant={'circle'}
              css={{ '&:not(:disabled)': { cursor: 'pointer' } }}
            />

            <Text
              weight={'regular'}
              size={'sm'}
              color={termsError ? '$colors$error600' : ''}
            >
              {t('signup.signUpInputs.acceptTerms')}
            </Text>
          </CheckContainer>

          <ButtonsContainer>
            <Button type={'submit'} size={'lg'}>
              {t('signup.createAccount')}
            </Button>

            <Link href={'/signin'} legacyBehavior>
              <SignInButton />
            </Link>
          </ButtonsContainer>
        </Form>
      </Box>
    </Background>
  )
}
