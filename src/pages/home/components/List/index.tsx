/* eslint-disable no-undef */

import { Header } from '../Header'
import { ListContainer } from './style'

interface ListProps {
  servers: ListType.Server[]
}

export const List = ({ servers }: ListProps): JSX.Element => {
  return (
    <ListContainer>
      <Header />
    </ListContainer>
  )
}
