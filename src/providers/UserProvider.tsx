/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Database } from '@/@types/supabase'
import { UserIdentitySchemaType } from '@/schemas/users/IdentitySchema'
import { trpc } from '@/utils/trpc'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, {
  Context,
  createContext,
  useCallback,
  useContext,
  useEffect,
} from 'react'

interface ProviderProps {
  user: UserIdentitySchemaType | null
  signUp: (email: string, password: string, name: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  signOut: () => Promise<void>
}

const UserCtx = createContext<ProviderProps | null>(null)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const supabase = createClientComponentClient<Database>()
  const { data: user, refetch } = trpc.users.getUserIdentity.useQuery()

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

  const forgotPassword = useCallback(
    async (email: string) => {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      })
    },
    [supabase.auth],
  )

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()

    refetch()
  }, [refetch, supabase.auth])

  useEffect(() => {
    if (!user) {
      const id = setInterval(() => {
        supabase.auth.getSession().then(({ data }) => {
          if (data.session) {
            refetch()
          }
        })
      }, 5000)

      return () => clearInterval(id)
    }
  }, [user, refetch, supabase.auth])

  return (
    <UserCtx.Provider
      value={{
        user: user || null,
        signUp,
        signIn,
        forgotPassword,
        signOut,
      }}
    >
      {children}
    </UserCtx.Provider>
  )
}

export const useClientUser = () =>
  useContext<ProviderProps>(UserCtx as Context<ProviderProps>)
