import { Session, User } from '@supabase/supabase-js'

interface SessionUser extends User {
  amr: { method: string; timestamp: number }[]
}

export const isUserValid = (session: Session): boolean => {
  const userSession = session.user as SessionUser

  for (const { method } of userSession.amr) {
    if (method === 'recovery') {
      return false
    }
  }

  return true
}
