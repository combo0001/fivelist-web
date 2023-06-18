/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { Context, createContext, useContext } from 'react'

const ProfileCtx = createContext<UserType.Provider | null>(null)

export const ProfileProvider: React.FC<{
  children: React.ReactNode
  user: UserType.UserObject
}> = ({ children, user }) => {
  return <ProfileCtx.Provider value={user}>{children}</ProfileCtx.Provider>
}

export const useProfile = () =>
  useContext<UserType.Provider>(ProfileCtx as Context<UserType.Provider>)
