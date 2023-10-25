/* eslint-disable no-undef */
import { styled } from '@/styles'
import { SearchInput, Select } from '@5list-design-system/react'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { OrderValueEnum, useFilter } from '../providers/FilterProvider'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation('pages')
  const filterRef = useRef<HTMLElement>()

  const [ randomKey, setRandomKey ] = useState<number>(0)

  const {
    serverName,
    setServerName,
    setServerLocation,
    getCountries,
    orderBy,
    orderOptions,
    setOrderBy,
  } = useFilter()

  const countries = getCountries()

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

  useEffect(() => {
    setRandomKey((state) => state + 1)
  }, [ orderOptions ])

  return (
    <FilterContainer ref={filterRef as any}>
      <SearchInput
        name={'name'}
        placeholder={t('home.filterInputs.searchName')}
        value={serverName}
        onChange={handleOnChangeServerName}
        outlined
      />

      <Select
        width={'17.875rem'}
        height={'$12'}
        placeHolder={t('home.filterInputs.searchLocale')}
        options={countries}
        onValueChange={handleOnChangeServerLocation}
      />

      <Select
        key={randomKey}
        width={'17.875rem'}
        height={'$12'}
        options={orderOptions}
        defaultValue={orderBy}
        onValueChange={handleOnChangeOrderBy}
        prefix={`${t('home.filterInputs.orderBy')}:`}
      />
    </FilterContainer>
  )
}
