/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import createClient from '@/lib/supabase-server'
import { User, Session } from '@supabase/supabase-js'
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
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()

  useEffect(() => {
    if (!user) {
      supabase.auth.getUser().then(({ data }) => {
        setUser(data.user)
      })
    }
  }, [user, supabase])

  const signUp = useCallback(
    async (name: string, email: string, password: string) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            full_name: name,
          },
        },
      })

      if (error) throw error

      return data
    },
    [supabase],
  )

  const signIn = useCallback(
    async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      return data
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
        signOut,
      }}
    >
      {children}
    </UserCtx.Provider>
  )
}

export const useClientUser = () =>
  useContext<ProviderProps>(UserCtx as Context<ProviderProps>)
