import api from '@/utils/serverConnection'
import { destroyCookie, parseCookies } from 'nookies'

interface UserRegisterType {
  name: string
  email: string
  password: string
}

interface UserRegisterResponseType {
  customId: string
}

export const postSignup = async (
  user: UserRegisterType,
): Promise<UserRegisterResponseType | void> => {
  const response = await api.post('/v1/users/', user)

  if (response.status === 201) {
    return response.data
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
