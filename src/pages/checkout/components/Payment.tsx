import { PayerAddressSchema } from '@/schemas/payment/PayerAddressSchema'
import { PayerIdentitySchema } from '@/schemas/payment/PayerIdentitySchema'
import {
  PayerPaymentMethodEnum,
  PayerPaymentMethodEnumType,
} from '@/schemas/payment/PayerPaymentMethodSchema'
import { Button, Heading, Text, TextInput } from '@5list-design-system/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { styled } from '@/styles'
import { ComponentProps } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import {
  MethodCreditCardIcon,
  MethodPixIcon,
  MethodTicketIcon,
} from '@/components/Icons'
import { useCheckout } from '../providers/CheckoutProvider'
import { useRouter } from 'next/navigation'

const PaymentFormSchema = z.object({
  ...PayerIdentitySchema.shape,
  ...PayerAddressSchema.shape,
  paymentMethod: PayerPaymentMethodEnum,
})

type PaymentFormSchemaType = z.infer<typeof PaymentFormSchema>

const PaymentWrapper = styled('form', {
  padding: '$6',
  height: 'fit-content',

  display: 'flex',
  flexDirection: 'column',
  gap: '$6',

  backgroundColor: '$neutral800',
  borderRadius: '$lg',

  '& > *': {
    listStyleType: 'none',
  },
})

const UserDataContainer = styled('div', {
  display: 'grid',
  gridTemplateRows: '1fr 1fr',
  gridTemplateColumns: '1fr 1fr',
  gridGap: '$4 $6',
})

const UserAddressContainer = styled('div', {
  display: 'grid',
  gridTemplateRows: 'repeat(3, 1fr)',
  gridTemplateColumns: 'repeat(6, 1fr)',
  gridGap: '$4 $6',

  '& > *:nth-child(1), & > *:nth-child(3)': {
    gridColumn: '1 / 4',
  },

  '& > *:nth-child(2), & > *:nth-child(4)': {
    gridColumn: '4 / 7',
  },

  '& > *:nth-child(5)': {
    gridColumn: '1 / 3',
  },

  '& > *:nth-child(6)': {
    gridColumn: '3 / 5',
  },

  '& > *:nth-child(7)': {
    gridColumn: '5 / 7',
  },
})

const PaymentMethodContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
})

const PaymentMethodButtonWrapper = styled('button', {
  width: '100%',

  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  background: 'transparent',
  borderRadius: '$md',
  padding: '$4 $2',

  transition: 'all 100ms ease-in-out',
  cursor: 'pointer',

  variants: {
    selected: {
      true: {
        height: '3.5rem',
        border: '0.0625rem solid $primary600',
      },
      false: {
        height: '$12',
        border: '0.0625rem solid $neutral600',
      },
    },
  },
})

interface PaymentMethodButtonProps
  extends ComponentProps<typeof PaymentMethodButtonWrapper> {
  paymentMethod: PayerPaymentMethodEnumType
  selected?: boolean
}

const PaymentMethodButton = ({
  paymentMethod,
  selected,
  ...props
}: PaymentMethodButtonProps): JSX.Element => {
  let iconComponent: React.ReactNode | null = null
  let methodName: string | null = null

  switch (paymentMethod) {
    case 'TICKET':
      iconComponent = <MethodTicketIcon css={{ size: '$6' }} />
      methodName = 'Boleto bancário'

      break
    case 'PIX':
      iconComponent = <MethodPixIcon css={{ size: '$6' }} />
      methodName = 'Pagamento por PIX'

      break
    case 'CREDIT_CARD':
      iconComponent = <MethodCreditCardIcon css={{ size: '$6' }} />
      methodName = 'Cartão de crédito'

      break
  }

  return (
    <PaymentMethodButtonWrapper {...(props as any)} selected={!!selected}>
      {iconComponent}

      <Text size={'sm'} color={'white'}>
        {methodName}
      </Text>
    </PaymentMethodButtonWrapper>
  )
}

export const Payment = (): JSX.Element => {
  const { finishOrder } = useCheckout()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<PaymentFormSchemaType>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: zodResolver(PaymentFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      identification: '',
      email: '',
      street: '',
      complement: '',
      zipCode: '',
      neighborhood: '',
      city: '',
      state: '',
    },
  })

  const handleOnSubmit = async (data: PaymentFormSchemaType): Promise<void> => {
    const redirectURL = await finishOrder(data.paymentMethod, {
      identification: data.identification,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      address: {
        houseNumber: data.houseNumber,
        street: data.street,
        complement: data.complement,
        zipCode: data.zipCode,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
      },
    })

    if (redirectURL) router.push(redirectURL)
  }

  return (
    <PaymentWrapper onSubmit={handleSubmit(handleOnSubmit, console.log)}>
      <Heading as={'h5'} weight={'bold'}>
        Dados para pagamento
      </Heading>

      <UserDataContainer>
        <TextInput
          disabled={isSubmitting || isSubmitSuccessful}
          spellCheck={false}
          placeholder={'Nome'}
          outlined
          {...register('firstName')}
        />

        <TextInput
          disabled={isSubmitting || isSubmitSuccessful}
          spellCheck={false}
          placeholder={'Sobrenome'}
          outlined
          {...register('lastName')}
        />

        <TextInput
          disabled={isSubmitting || isSubmitSuccessful}
          spellCheck={false}
          placeholder={'CPF'}
          outlined
          {...register('identification')}
        />

        <TextInput
          disabled={isSubmitting || isSubmitSuccessful}
          spellCheck={false}
          placeholder={'E-mail'}
          outlined
          {...register('email')}
        />
      </UserDataContainer>

      <Heading as={'h5'} weight={'bold'}>
        Endereço
      </Heading>

      <UserAddressContainer>
        <TextInput
          disabled={isSubmitting || isSubmitSuccessful}
          spellCheck={false}
          placeholder={'Rua'}
          outlined
          {...register('street')}
        />

        <TextInput
          disabled={isSubmitting || isSubmitSuccessful}
          spellCheck={false}
          placeholder={'Número da casa'}
          outlined
          {...register('houseNumber', { valueAsNumber: true })}
        />

        <TextInput
          disabled={isSubmitting || isSubmitSuccessful}
          spellCheck={false}
          placeholder={'Complemento'}
          outlined
          {...register('complement')}
        />

        <TextInput
          disabled={isSubmitting || isSubmitSuccessful}
          spellCheck={false}
          placeholder={'Bairro'}
          outlined
          {...register('neighborhood')}
        />

        <TextInput
          disabled={isSubmitting || isSubmitSuccessful}
          spellCheck={false}
          placeholder={'Cidade'}
          outlined
          {...register('city')}
        />

        <TextInput
          disabled={isSubmitting || isSubmitSuccessful}
          spellCheck={false}
          placeholder={'Estado'}
          outlined
          {...register('state')}
        />

        <TextInput
          disabled={isSubmitting || isSubmitSuccessful}
          spellCheck={false}
          placeholder={'CEP'}
          outlined
          {...register('zipCode')}
        />
      </UserAddressContainer>

      <Heading as={'h5'} weight={'bold'}>
        Pagamento
      </Heading>

      <PaymentMethodContainer>
        <Controller
          name={'paymentMethod'}
          control={control}
          render={({ field: { value, onChange } }) => (
            <>
              <PaymentMethodButton
                paymentMethod={'CREDIT_CARD'}
                type={'button'}
                onClick={() => onChange('CREDIT_CARD')}
                selected={value === 'CREDIT_CARD'}
              />

              <PaymentMethodButton
                paymentMethod={'PIX'}
                type={'button'}
                onClick={() => onChange('PIX')}
                selected={value === 'PIX'}
              />

              <PaymentMethodButton
                paymentMethod={'TICKET'}
                type={'button'}
                onClick={() => onChange('TICKET')}
                selected={value === 'TICKET'}
              />

              <Button
                disabled={!value || isSubmitting || isSubmitSuccessful}
                type={'submit'}
              >
                Finalizar pagamento
              </Button>
            </>
          )}
        />
      </PaymentMethodContainer>
    </PaymentWrapper>
  )
}
