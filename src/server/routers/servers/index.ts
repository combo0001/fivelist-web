import { router } from '../../trpc'
import { getServerList } from './handlers/getServerList'

export const serversRouter = router({
  getServerList
})
