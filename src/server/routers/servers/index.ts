import { router } from '../../trpc'
import { getServerList } from './handlers/getServerList'
import { getServerProfile } from './handlers/getServerProfile'
import { getPageJoinId } from './handlers/getPageJoinId'
import { setServerBanner } from './handlers/setServerBanner'
import { setServerDescription } from './handlers/setServerDescription'
import { setServerCustomId } from './handlers/setServerCustomId'
import { addServerSocialMedia } from './handlers/addServerSocialMedia'
import { removeServerSocialMedia } from './handlers/removeServerSocialMedia'
import { addServerConnection } from './handlers/addServerConnection'
import { removeServerConnection } from './handlers/removeServerConnection'
import { getServerReviews } from './handlers/getServerReviews'
import { createServerReview } from './handlers/createServerReview'
import { createServerReplyOfReview } from './handlers/createServerReplyOfReview'

export const serversRouter = router({
  getServerList,
  getServerProfile,
  getPageJoinId,
  getServerReviews,
  setServerDescription,
  setServerBanner,
  setServerCustomId,
  addServerSocialMedia,
  removeServerSocialMedia,
  addServerConnection,
  removeServerConnection,
  createServerReview,
  createServerReplyOfReview,
})
