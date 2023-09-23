import { router } from '../../trpc'
import { getServerList } from './handlers/getServerList'
import { getServerProfile } from './handlers/getServerProfile'

export const serversRouter = router({
  getServerList,
  getServerProfile
})
