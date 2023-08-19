/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Database } from '@/@types/supabase'
import { trpc } from '@/utils/trpc'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
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
  const supabase = createClientComponentClient<Database>()
  const { data: user } = trpc.users.getUser.useQuery()

  const signUp = useCallback(
    async (email: string, password: string, name: string) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
          emailRedirectTo: window.location.origin,
        },
      })

      if (error) {
        throw error
      } else {
        return data as any
      }
    },
    [supabase],
  )

  const signIn = useCallback(
    async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      } else {
        return data as any
      }
    },
    [supabase],
  )

  const signOut = useCallback(async () => {}, [])

  return (
    <UserCtx.Provider
      value={{
        user,
        signUp,
        signIn,
      }}
    >
      {children}
    </UserCtx.Provider>
  )
}

export const useClientUser = () =>
  useContext<ProviderProps>(UserCtx as Context<ProviderProps>)
