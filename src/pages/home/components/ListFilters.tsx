/* eslint-disable no-undef */
import { styled } from '@/styles'
import { SearchInput, Select } from '@5list-design-system/react'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { useFilter } from '../providers/FilterProvider'

const FilterContainer = styled('section', {
  '--grid-gap': '$space$2',
  '--padding': '$space$4',

  width: '100%',
  height: '$20',
  padding: 'var(--padding)',

  display: 'grid',
  gridTemplateRows: '1fr',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridGap: 'var(--grid-gap)',

  [`${Select}`]: {
    position: 'absolute',
  },
})

export const ListFilters = (): JSX.Element => {
  const [contentWidth, setWidth] = useState<string>()
  const filterRef = useRef<HTMLElement>()

  const handleOnResize = (): void => {
    if (filterRef.current) {
      const filterWidth = `${filterRef.current.clientWidth}px`

      setWidth(
        `calc((${filterWidth} - (var(--grid-gap) * 3) - (var(--padding) * 2)) / 4)`,
      )
    }
  }

  useEffect(() => {
    if (!contentWidth) {
      handleOnResize()
    } else {
      window.addEventListener('resize', handleOnResize)

      return () => window.removeEventListener('resize', handleOnResize)
    }
  })

  const {
    serverName,
    playerName,
    serverLocation,
    orderBy,
    setServerName,
    setPlayerName,
    setServerLocation,
    setOrderBy,
  } = useFilter()

  const handleOnChangeServerName = ({
    target,
  }: ChangeEvent<HTMLInputElement>): void => {
    setServerName(target.value)
  }

  const handleOnChangePlayerName = ({
    target,
  }: ChangeEvent<HTMLInputElement>): void => {
    setPlayerName(target.value)
  }

  const handleOnChangeServerLocation = (value: string): void => {
    setServerLocation(value)
  }

  const handleOnChangeOrderBy = (value: FilterType.OrderServers): void => {
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

      <SearchInput
        name={'username'}
        placeholder={'Pesquisar jogador'}
        value={playerName}
        onChange={handleOnChangePlayerName}
        outlined
      />

      <Select
        width={contentWidth || '100%'}
        height={'$12'}
        options={[{ label: 'Brasil', value: 'BR' }]}
        placeHolder={'Localização do servidor'}
        value={serverLocation}
        onValueChange={handleOnChangeServerLocation}
      />

      <Select
        width={contentWidth || '100%'}
        height={'$12'}
        options={[{ label: 'Brasil', value: 'BR' }]}
        prefix={'Ordenar por:'}
        defaultValue={'BR'}
        value={orderBy}
        onValueChange={handleOnChangeOrderBy}
      />
    </FilterContainer>
  )
}
