/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import createClient from '@/lib/supabase/supabase-server'
import { trpc } from '@/utils/trpc'
import { Session, User } from '@supabase/supabase-js'
import React, {
  Context,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

type ProviderProps = UserType.Provider<User, Session>

const UserCtx = createContext<ProviderProps | null>(null)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: user } = trpc.users.getUser.useQuery()
  const utils = trpc.useContext()

  console.log(user)
  const signUp = useCallback(
    async (name: string, email: string, password: string) => {
      const { data, status } = await utils.users.signup.fetch({
        name,
        email,
        password,
      })

      if (status !== 200) {
        throw new Error(data as string)
      }

      return data as any
    },
    [utils],
  )

  const signIn = useCallback(async (email: string, password: string) => {
    // const { data, error } = await supabase.auth.signInWithPassword({
    //   email,
    //   password,
    // })

    // if (error) throw error

    // setUser(data.user)

    return {} as any
  }, [])

  const signOut = useCallback(async () => {}, [])

  return (
    <UserCtx.Provider
      value={{
        user,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </UserCtx.Provider>
  )
}

export const useClientUser = () =>
  useContext<ProviderProps>(UserCtx as Context<ProviderProps>)
