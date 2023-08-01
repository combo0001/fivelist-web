import api from '@/utils/serverConnection'
import { destroyCookie, parseCookies, setCookie } from 'nookies'

interface UserRegisterType {
  name: string
  email: string
  password: string
}

interface ApiResponseType<T = any, E = any> {
  status: boolean
  data: T | E
}

export interface ApiErrorType {
  error: string
  message: string
}

export interface UserRegisterResponseType {
  expire_at: string
  token: string
  type: string
}

export const postSignup = async (
  user: UserRegisterType,
): Promise<ApiResponseType<UserRegisterResponseType, ApiErrorType>> => {
  try {
    const response = await api.post('/v1/users/', user)

    if (response.status !== 201)
      return {
        status: false,
        data: {
          error: 'INVALID_STATUS',
          message: 'Status not expected',
        },
      }

    setCookie(null, 'FIVELIST_ACCESS_TOKEN', response.data.token)

    return {
      status: true,
      data: response.data as UserRegisterResponseType,
    }
  } catch ({ response }: any) {
    return {
      status: false,
      data: response.data as ApiErrorType,
    }
  }
}

// eslint-disable-next-line no-undef
export const getUser = async (): Promise<UserType.UserObject | void> => {
  const cookies = parseCookies()
  const accessToken = cookies.FIVELIST_ACCESS_TOKEN

  if (accessToken) {
    const response = await api.get('/v1/users/', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    try {
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      destroyCookie(null, 'FIVELIST_ACCESS_TOKEN')
    }
  }
}

export default {
  getUser,
}
