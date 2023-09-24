import { router } from '../../trpc'
import { getServerList } from './handlers/getServerList'
import { getServerProfile } from './handlers/getServerProfile'
import { getPageJoinId } from './handlers/getPageJoinId'

export const serversRouter = router({
  getServerList,
  getServerProfile,
  getPageJoinId
})
