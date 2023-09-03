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

import { SignInButton } from './components/SignIn'
import { Form, InputsContainer } from './style'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/@types/supabase'
import { useClientUser } from '@/providers/UserProvider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const passwordSchema = z
  .string()
  .min(8, 'A senha deve ter pelo menos 8 caracteres')
  .refine(
    (value) => {
      const hasLowerCase = /[a-z]/.test(value)
      const hasUpperCase = /[A-Z]/.test(value)
      const hasNumber = /\d/.test(value)

      return value.length >= 8 && hasLowerCase && hasUpperCase && hasNumber
    },
    {
      message: 'A senha deve incluir maiúsculas, minúsculas e números.',
    },
  )

const ResetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string(),
})

type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>

// eslint-disable-next-line no-undef
export const ResetPasswordMain = (): JSX.Element => {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()

  const { user } = useClientUser()

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

  const handleOnSubmit = async ({ password, confirmPassword }: ResetPasswordSchemaType): Promise<void> => {
    if (password === confirmPassword) {
      await supabase.auth.updateUser({ password })

      router.push('/')
    } else {
      setError('confirmPassword', {
        type: 'equal_password',
        message: 'As senhas não coincidem',
      })
    }
  }
  
  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [ user ])

  return (
    <Background>
      <Box>
        <Link href={'/'}>
          <Back />
        </Link>

        <Form onSubmit={handleSubmit(handleOnSubmit)} action="">
          <Header
            title={'Trocar senha'}
            subtitle={`Criar uma nova senha para sua conta ${''}`}
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
                placeholder={'Criar nova senha'}
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
                placeholder={'Repetir nova senha'}
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
            Alterar senha
          </Button>
        </Form>

        <Link href={'/signin'} legacyBehavior>
          <SignInButton />
        </Link>
      </Box>
    </Background>
  )
}
