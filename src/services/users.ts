import api from '@/utils/serverConnection'
import { GetServerSidePropsContext } from 'next'

import { parseCookies } from 'nookies'

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

export const getUser = async (
  ctx: GetServerSidePropsContext,
): Promise<void> => {
  const cookies = parseCookies(ctx)
  const accessToken = cookies.FIVELIST_ACCESS_TOKEN

  if (accessToken) {
    try {
      const response = await api.get('/v1/users/', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })

      if (response.status === 200) {
        return response.data
      }
    } catch (err) {}
  }
}

export default {
  getUser,
}
