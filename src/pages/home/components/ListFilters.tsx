/* eslint-disable no-undef */
import { styled } from '@/styles'
import { SearchInput, Select } from '@5list-design-system/react'
import { ChangeEvent, useRef } from 'react'

import { OrderValueEnum, useFilter } from '../providers/FilterProvider'

const FilterContainer = styled('section', {
  '--grid-gap': '$space$2',
  '--padding': '$space$4',

  width: '100%',
  height: '$20',
  padding: 'var(--padding)',

  display: 'grid',
  gridTemplateRows: '1fr',
  gridTemplateColumns: '1fr repeat(2, 17.875rem)',
  gridGap: 'var(--grid-gap)',

  overflow: 'visible',
})

export const ListFilters = (): JSX.Element => {
  const filterRef = useRef<HTMLElement>()

  const {
    serverName,
    setServerName,
    orderBy,
    setServerLocation,
    setOrderBy,
    getCountries,
    getOrders,
  } = useFilter()

  const countries = getCountries()
  const orders = getOrders()

  const handleOnChangeServerName = ({
    target,
  }: ChangeEvent<HTMLInputElement>): void => {
    setServerName(target.value)
  }

  const handleOnChangeServerLocation = (value: string): void => {
    setServerLocation(value)
  }

  const handleOnChangeOrderBy = (value: OrderValueEnum): void => {
    setOrderBy(value)
  }

  return (
    <FilterContainer ref={filterRef as any}>
      <SearchInput
        name={'server-name'}
        placeholder={'Pesquisar servidor'}
        value={serverName}
        onChange={handleOnChangeServerName}
        outlined
      />

      <Select
        width={'17.875rem'}
        height={'$12'}
        placeHolder={'Localização do servidor'}
        options={countries}
        onValueChange={handleOnChangeServerLocation}
      />

      <Select
        width={'17.875rem'}
        height={'$12'}
        options={orders}
        defaultValue={orderBy}
        onValueChange={handleOnChangeOrderBy}
        prefix="Ordenar por:"
      />
    </FilterContainer>
  )
}
