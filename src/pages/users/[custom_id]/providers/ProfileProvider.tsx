/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { UserPageSchemaType } from '@/lib/schemas/UserPageSchema'
import React, { Context, createContext, useContext } from 'react'

interface ProfileProviderProps {
  user: UserPageSchemaType
}

const ProfileCtx = createContext<ProfileProviderProps | null>(null)

export const ProfileProvider: React.FC<{
  children: React.ReactNode
  user: UserPageSchemaType
}> = ({ children, user }) => {
  return <ProfileCtx.Provider value={{ user }}>{children}</ProfileCtx.Provider>
}

export const useProfile = () =>
  useContext<ProfileProviderProps>(ProfileCtx as Context<ProfileProviderProps>)
