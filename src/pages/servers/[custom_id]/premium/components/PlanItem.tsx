import { PlanSchemaType } from '@/schemas/PremiumSchema'
import { styled } from '@/styles'
import { usePremium } from '../providers/PremiumProvider'
import { Button, Heading, Text } from '@5list-design-system/react'
import { CheckedIcon, NotCheckedIcon } from '@/components/Icons'
import { usePlans } from '../providers/PlansProvider'

type PlansContainerProps = PlanSchemaType

const PlanWrapper = styled('li', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$10',

  width: '320px',
  padding: '$10',

  background: '$neutral900',
  borderRadius: '$lg',

  '& > *': {
    userSelect: 'none',
  },

  variants: {
    outlined: {
      true: {
        outline: '0.125rem solid $primary900',
        boxShadow: '0 0 $space$6 0 rgba(59, 127, 241, 0.50)',
      },
      false: {
        outline: '0.0625rem solid $neutral700',
      },
    },
  },
})

const TitleContainer = styled('section', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  '& > *:first-child': {
    flex: 1,
  },
})

const TagContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  padding: '$2',
  borderRadius: '$lg',

  variants: {
    primary: {
      true: {
        background: '$primary900',
      },
      false: {},
    },
    secondary: {
      true: {
        background: '$neutral300',
      },
      false: {},
    },
  },
})

const PrivilegesContainer = styled('ol', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',

  '& > *:first-child': {
    listStyleType: 'none',
  },
})

const PrivilegeItem = styled('li', {
  maxWidth: 'fit-content',

  display: 'flex',
  alignItems: 'center',
  gap: '$4',
})

const DivisorLine = styled('div', {
  width: '100%',
  height: '0.0625rem',

  background: '$neutral700',
})

const IconContainer = styled('div', {
  size: '$6',

  '&::after': {
    pointerEvents: 'none',

    position: 'absolute',
    transform: 'translate(0, $space$8)',

    maxWidth: '20rem',
    padding: '$4',

    background: '$neutral800',
    borderRadius: '$lg',

    textAlign: 'left',
    boxShadow: '0 0 $space$6 0 rgba(0, 0, 0, 0.50)',

    transition: 'opacity 100ms ease-in-out',
    opacity: 0,
  },

  '&:hover': {
    '&::after': {
      opacity: 1,
    },
  },
})

export const PlanItem = (plan: PlansContainerProps): JSX.Element => {
  const { privileges } = usePlans()
  const { offer, goToCheckout } = usePremium()

  let planName = null
  let tagName = null

  const price = plan.price[offer]
  const priceFormatted =
    price?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) ||
    price

  const handleOnBuyPlan = (plan: PlanSchemaType) => {
    goToCheckout(plan)
  }

  switch (plan.id) {
    case 'BASIC_TIER':
      planName = 'Básico'

      break
    case 'PRO_TIER':
      planName = 'Profissional'

      break
    case 'BUSINESS_TIER':
      planName = 'Business'

      break
    default:
      planName = 'Gratuíto'
  }

  switch (plan.tag) {
    case 'FREE':
      tagName = 'Grátis'

      break
    case 'BEST_SELLER':
      tagName = 'Mais vendido'

      break
    case 'RECOMMENDED':
      tagName = 'Recomendado'
  }

  return (
    <PlanWrapper outlined={plan.tag === 'RECOMMENDED'}>
      <TitleContainer>
        <Heading as={'h5'}>{planName}</Heading>

        {tagName && (
          <TagContainer
            primary={plan.tag !== 'FREE'}
            secondary={plan.tag === 'FREE'}
          >
            <Text
              size={'xs'}
              weight={'bold'}
              color={'$white'}
              css={{ lineHeight: '100%' }}
            >
              {tagName}
            </Text>
          </TagContainer>
        )}
      </TitleContainer>

      <Heading as={'h3'} weight={'bold'}>
        {priceFormatted || 'Contato'}
      </Heading>

      <PrivilegesContainer>
        {privileges?.map(({ id, name, description }) => (
          <PrivilegeItem key={id}>
            {plan.privileges[id] ? (
              <>
                <IconContainer css={{ '&::after': { content: description } }}>
                  <CheckedIcon css={{ stroke: '$primary600' }} />
                </IconContainer>

                <Text size={'sm'} color={'$white'}>
                  {name}
                </Text>
              </>
            ) : (
              <>
                <IconContainer css={{ '&::after': { content: description } }}>
                  <NotCheckedIcon css={{ fill: '$error600' }} />
                </IconContainer>

                <Text
                  size={'sm'}
                  color={'$neutral200'}
                  css={{ textDecoration: 'line-through' }}
                >
                  {name}
                </Text>
              </>
            )}
          </PrivilegeItem>
        ))}
      </PrivilegesContainer>

      <DivisorLine />

      {plan.tag !== 'FREE' ? (
        <Button size={'lg'} onClick={handleOnBuyPlan.bind(null, plan)}>
          {priceFormatted ? 'Assinar plano' : 'Entre em contato'}
        </Button>
      ) : (
        <Button size={'lg'} disabled>
          <Text size={'sm'} color={'$neutral200'}>
            Já assinado
          </Text>
        </Button>
      )}
    </PlanWrapper>
  )
}
