/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { getUser } from '@/services/users'
import React, {
  Context,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

const UserCtx = createContext<UserType.Provider | null>(null)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserType.UserObject>()

  useEffect(() => {
    if (!user) {
      getUser().then((user) => {
        setUser(user)
      })
    }
  }, [user])

  return (
    <UserCtx.Provider
      value={{
        user,
      }}
    >
      {children}
    </UserCtx.Provider>
  )
}

export const useClientUser = () =>
  useContext<UserType.Provider>(UserCtx as Context<UserType.Provider>)
