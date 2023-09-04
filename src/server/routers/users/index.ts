import { router } from '../../trpc'
import { getUserIdentity } from './handlers/getUserIdentity'
import { getUserProfile } from './handlers/getUserProfile'
import { setUserBanner } from './handlers/setUserBanner'
import { setUserDescription } from './handlers/setUserDescription'
import { setUserStreamLink } from './handlers/setUserStreamLink'
import { addUserSocialMedia } from './handlers/addUserSocialMedia'
import { removeUserSocialMedia } from './handlers/removeUserSocialMedia'

export const usersRouter = router({
  getUserIdentity,
  getUserProfile,
  setUserBanner,
  setUserDescription,
  setUserStreamLink,
  addUserSocialMedia,
  removeUserSocialMedia
})
