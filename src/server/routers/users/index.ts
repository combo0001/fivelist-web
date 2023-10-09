import { router } from '../../trpc'
import { getUserIdentity } from './handlers/getUserIdentity'
import { getUserProfile } from './handlers/getUserProfile'
import { getUserCurrentLike } from './handlers/getUserCurrentLike'
import { setUserBanner } from './handlers/setUserBanner'
import { setUserLike } from './handlers/setUserLike'
import { setUserDescription } from './handlers/setUserDescription'
import { setUserStreamLink } from './handlers/setUserStreamLink'
import { addUserSocialMedia } from './handlers/addUserSocialMedia'
import { removeUserSocialMedia } from './handlers/removeUserSocialMedia'
import { addUserConnection } from './handlers/addUserConnection'
import { viewUser } from './handlers/viewUser'
import { followUser } from './handlers/followUser'
import { unfollowUser } from './handlers/unfollowUser'
import { isUserFollower } from './handlers/isUserFollower'

export const usersRouter = router({
  getUserIdentity,
  getUserProfile,
  getUserCurrentLike,
  setUserLike,
  setUserBanner,
  setUserDescription,
  setUserStreamLink,
  addUserSocialMedia,
  removeUserSocialMedia,
  addUserConnection,
  viewUser,
  followUser,
  unfollowUser,
  isUserFollower,
})
