import { router } from '../../trpc'
import { getUserIdentity } from './handlers/getUserIdentity'
import { getUserProfile } from './handlers/getUserProfile'
import { setUserBanner } from './handlers/setUserBanner'

export const usersRouter = router({
  getUserIdentity,
  getUserProfile,
  setUserBanner,
})
