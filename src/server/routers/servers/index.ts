import { router } from '../../trpc'
import { getServerList } from './handlers/getServerList'
import { getServerProfile } from './handlers/getServerProfile'
import { getPageJoinId } from './handlers/getPageJoinId'
import { setServerDescription } from './handlers/setServerDescription'
import { setServerCustomId } from './handlers/setServerCustomId'
import { addServerSocialMedia } from './handlers/addServerSocialMedia'
import { removeServerSocialMedia } from './handlers/removeServerSocialMedia'

export const serversRouter = router({
  getServerList,
  getServerProfile,
  getPageJoinId,
  setServerDescription,
  setServerCustomId,
  addServerSocialMedia,
  removeServerSocialMedia
})
