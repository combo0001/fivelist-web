/* eslint-disable no-undef */
import { styled } from '@/styles'
import { PlanItem } from './PlanItem'
import { usePlans } from '../providers/PlansProvider'

const PlansWrapper = styled('ul', {
  display: 'flex',
  alignItems: 'center',
  gap: '1.625rem',

  overflow: 'visible',

  '& > *': {
    listStyleType: 'none',
  },
})

export const PlansContainer = (): JSX.Element => {
  const { plans } = usePlans()
  
  return (
    <PlansWrapper>
      {
        plans?.map((plan) => (
          <PlanItem 
            key={plan.id}
            {...plan}
          />
        ))
      }
    </PlansWrapper>
  )
}