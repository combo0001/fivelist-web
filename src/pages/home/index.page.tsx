/* eslint-disable no-undef */
import { HomeMain } from './main'
import { ServersListProvider } from './providers/ServersListProvider'

export default function Home(): JSX.Element {
  return (
    <ServersListProvider servers={[]} newServers={[]}> 
      <HomeMain /> 
    </ServersListProvider>
  )
}
