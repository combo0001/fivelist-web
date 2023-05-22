import { setCookie } from 'nookies'
import api from '../utils/serverConnection'

interface LoginCredentialsType {
  email: string
  password: string
}

export const postLogin = async (
  credentials: LoginCredentialsType,
): Promise<boolean> => {
  const response = await api.post('/v1/auth/login', credentials)

  if (response.status === 200) {
    const { token } = response.data as { token: string }

    setCookie(null, 'FIVELIST_ACCESS_TOKEN', token)

    return true
  } else {
    return false
  }
}

export const postLogout = async () => {
  await api.post('/v1/auth/logout')
}

export const forgotPassword = async (email: string) => {}
