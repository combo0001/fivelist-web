import { UserProfileSchemaType } from '@/schemas/users/ProfileSchema'
import React, { Context, createContext, useContext, useState } from 'react'

interface ProviderProps {
  user: UserProfileSchemaType
}

const UserViewCtx = createContext<ProviderProps | null>(null)

export const UserViewProvider: React.FC<{
  children: React.ReactNode
  user: UserProfileSchemaType
}> = ({ children, user }) => {
  const [userToView, setUserToView] = useState(user)

  return (
    <UserViewCtx.Provider value={{ user: userToView }}>
      {children}
    </UserViewCtx.Provider>
  )
}

export const useUserView = () =>
  useContext<ProviderProps>(UserViewCtx as Context<ProviderProps>)
