import { router } from '../../trpc'
import { getUser } from './handlers/getUser'
import { getUserPage } from './handlers/getUserPage'

export const usersRouter = router({
  getUser,
  getUserPage,
})
