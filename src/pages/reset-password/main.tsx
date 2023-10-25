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
import { Button, Text, TextInput } from '@5list-design-system/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form, InputsContainer } from './style'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/@types/supabase'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { PasswordSchema } from '@/schemas/users/PasswordSchema'
import { useTranslation } from 'react-i18next'

const ResetPasswordSchema = z.object({
  password: PasswordSchema,
  confirmPassword: PasswordSchema,
})

type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>

const getCode = (): string | null => {
  const url = new URL(window.location.href)

  return url.searchParams.get('code')
}

// eslint-disable-next-line no-undef
export const ResetPasswordMain = (): JSX.Element => {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()

  const { t } = useTranslation('pages')

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, submitCount, isSubmitting, isSubmitSuccessful },
  } = useForm<ResetPasswordSchemaType>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const handleOnSubmit = async ({
    password,
    confirmPassword,
  }: ResetPasswordSchemaType): Promise<void> => {
    if (password === confirmPassword) {
      await supabase.auth.updateUser({ password })

      router.push('/')
    } else {
      setError('confirmPassword', {
        type: 'equal_password',
        message: t('resetPassword.changePasswordInputs.differentPasswords'),
      })
    }
  }

  useEffect(() => {
    const code = getCode()

    if (!code) {
      router.push('/')
    }
  }, [router])

  return (
    <Background>
      <Box>
        <Link href={'/'}>
          <Back />
        </Link>

        <Form onSubmit={handleSubmit(handleOnSubmit)} action="">
          <Header
            title={t('resetPassword.changePassword')}
            subtitle={t('resetPassword.changePasswordWarn')}
          />

          <InputsContainer>
            <InputContainer>
              <TextInput
                sufixIcon={
                  errors.password ? <Error /> : submitCount > 0 && <Success />
                }
                disabled={isSubmitting || isSubmitSuccessful}
                type={'password'}
                spellCheck={false}
                placeholder={t('resetPassword.changePasswordInputs.newPassword')}
                outlined
                {...register('password')}
              />

              {errors.password && (
                <Text color={'$colors$error600'} weight={'regular'} size={'xs'}>
                  {errors.password.message}
                </Text>
              )}
            </InputContainer>

            <InputContainer>
              <TextInput
                sufixIcon={
                  errors.confirmPassword ? (
                    <Error />
                  ) : (
                    submitCount > 0 && <Success />
                  )
                }
                disabled={isSubmitting || isSubmitSuccessful}
                type={'password'}
                spellCheck={false}
                placeholder={t('resetPassword.changePasswordInputs.confirmNewPassword')}
                outlined
                {...register('confirmPassword')}
              />

              {errors.confirmPassword && (
                <Text color={'$colors$error600'} weight={'regular'} size={'xs'}>
                  {errors.confirmPassword.message}
                </Text>
              )}
            </InputContainer>
          </InputsContainer>

          <Button type={'submit'} size={'lg'}>
            {t('resetPassword.changePasswordButton')}
          </Button>
        </Form>

        <Link href={'/home'} legacyBehavior>
          <Button type={'button'} size={'lg'} outlined>
            {t('resetPassword.backToHomeButton')}
          </Button>
        </Link>
      </Box>
    </Background>
  )
}
