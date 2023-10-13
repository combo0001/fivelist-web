import { OfferEnumSchemaType, PlanSchemaType } from "@/schemas/PremiumSchema"
import { Heading, Text } from "@5list-design-system/react"
import { styled } from "@/styles"
import { useState } from "react"
import { usePayment } from "../providers/PaymentProvider"

interface SummaryItemProps {
  offer: OfferEnumSchemaType,
  price: number,
  isEditing?: boolean
  onClick?: () => void
}

const SummaryWrapper = styled('ul', {
  padding: '$6',
  height: 'fit-content',

  display: 'flex',
  flexDirection: 'column',
  gap: '$6',

  backgroundColor: '$neutral800',
  borderRadius: '$lg',

  '& > *': {
    listStyleType: 'none',
  }
})

const SummaryControllerContainer = styled('li', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const SummaryItemWrapper = styled('div', {
  padding: '$6 $5',

  display: 'flex',
  flexDirection: 'column',
  gap: '$2',

  background: 'transparent',
  borderRadius: '$md',

  transition: 'background 100ms ease-in-out',

  variants: {
    highlighted: {
      true: {
        border: '0.0625rem solid $neutral100',
      },
      false: {
        border: '0.0625rem solid $primary600',
      },
    },
    selectable: {
      true: {
        cursor: 'pointer',
        '&:hover': {
          background: '$neutral600',
        },
      },
    }
  }
})

const SummaryItemTitleContainer = styled('section', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const SummaryItem = ({ offer, price, isEditing, onClick }: SummaryItemProps) => {
  const priceFormatted = price?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) || price

  let offerName = null 

  switch (offer) {
    case 'MONTHLY':
      offerName = 'Mensal'

      break 
    case 'QUARTERLY':
      offerName = 'Trimestral'

      break 
    case 'YEARLY':
      offerName = 'Anual'

      break 
  }

  return (
    <SummaryItemWrapper 
      highlighted={!!isEditing} 
      selectable={!!isEditing} 
      onClick={onClick}
    >
      <SummaryItemTitleContainer>
        <Text
          color={'$white'}
          weight={'normal'}
        >
          {offerName}
        </Text>

        {
          !!isEditing ?
            <Text color={'$neutral100'} weight={'normal'}>
              Escolher plano
            </Text>
          :
            <Text color={'$primary600'} weight={'normal'}>
              Plano escolhido
            </Text>
        }
      </SummaryItemTitleContainer>

      <Heading as={'h4'} weight={'bold'}>{priceFormatted}</Heading>
    </SummaryItemWrapper>
  )
}

export const Summary = (): JSX.Element => {
  const [isEditing, setEditing] = useState<boolean>(false)

  const { plan, offer, changeOffer } = usePayment()

  const handleOnEdit = (): void => {
    setEditing((state) => !state)
  }

  const handleOnSelect = (offer: OfferEnumSchemaType): void => {
    changeOffer(offer)
    setEditing(false)
  }

  if (!plan) {
    return <></>
  }

  return (
    <SummaryWrapper>
      <Heading as={'h5'} weight={'bold'}>Adiconado na sacola</Heading>

      <SummaryControllerContainer>
        <Text color={'$white'}>Alterar plano</Text>
        
        <Text 
          color={'$white'} 
          css={{
            cursor: 'pointer',
            userSelect: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
          onClick={handleOnEdit}
        >
          {!!isEditing ? 'Cancelar' : 'Editar'}
        </Text>
      </SummaryControllerContainer> 

      {
        isEditing ? 
          <>
            <SummaryItem 
              offer={'MONTHLY'}
              price={plan.price.MONTHLY as number}
              onClick={handleOnSelect.bind(null, 'MONTHLY')}
              isEditing
            />

            <SummaryItem 
              offer={'QUARTERLY'}
              price={plan.price.QUARTERLY as number}
              onClick={handleOnSelect.bind(null, 'QUARTERLY')}
              isEditing
            />

            <SummaryItem 
              offer={'YEARLY'}
              price={plan.price.YEARLY as number}
              onClick={handleOnSelect.bind(null, 'YEARLY')}
              isEditing
            />
          </>
        : 
          <SummaryItem 
            offer={offer}
            price={plan.price[offer] as number}
          />
      }     
    </SummaryWrapper>
  )
}