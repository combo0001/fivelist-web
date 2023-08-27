import { router } from '../../trpc'
import { getUserIdentity } from './handlers/getUserIdentity'
import { getUserProfile } from './handlers/getUserProfile'

export const usersRouter = router({
  getUserIdentity,
  getUserProfile,
})
