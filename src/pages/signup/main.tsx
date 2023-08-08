import {
  Back,
  Background,
  Box,
  Error,
  Header,
  InputContainer,
  Success,
} from '@/components/Auth'
import { Button, Checkbox, Text, TextInput } from '@5list-design-system/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { LoginButton } from './components/Login'
import {
  ButtonsContainer,
  CheckContainer,
  Form,
  InputsContainer,
} from './style'
import { useClientUser } from '@/providers/UserProvider'

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

const SignupSchema = z.object({
  name: z
    .string()
    .min(4, 'O nome é pequeno demais')
    .max(64, 'O nome é grande demais')
    .regex(
      /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]+)*$/,
      'O nome é inválido',
    ),
  email: z.string().email('E-mail inválido'),
  password: passwordSchema,
  termStatus: z.boolean().refine((value) => value === true),
})

type SignupSchemaType = z.infer<typeof SignupSchema>

// eslint-disable-next-line no-undef
export const SignupMain = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, submitCount, isSubmitting, isSubmitSuccessful },
  } = useForm<SignupSchemaType>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      termStatus: false,
    },
  })

  const { signUp } = useClientUser()

  const handleOnSubmit = async (data: SignupSchemaType): Promise<void> => {
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
            <Controller
              name={'termStatus'}
              control={control}
              render={({ field: { onChange, onBlur, ref } }) => (
                <Checkbox
                  ref={ref}
                  onBlur={onBlur}
                  onCheckedChange={(value: boolean) => onChange(value)}
                  variant={'circle'}
                  css={{ '&:not(:disabled)': { cursor: 'pointer' } }}
                />
              )}
            />

            <Text
              weight={'regular'}
              size={'sm'}
              color={errors.termStatus && '$colors$error600'}
            >
              Aceito os termos de responsabilidade
            </Text>
          </CheckContainer>

          <ButtonsContainer>
            <Button type={'submit'} size={'lg'}>
              Criar conta
            </Button>

            <Link href={'/login'} legacyBehavior>
              <LoginButton />
            </Link>
          </ButtonsContainer>
        </Form>
      </Box>
    </Background>
  )
}
