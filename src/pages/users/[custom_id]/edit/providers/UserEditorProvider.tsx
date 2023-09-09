import { UserProfileSchemaType } from '@/schemas/users/ProfileSchema'
import { trpc } from '@/utils/trpc'
import React, {
  Context,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'

interface ProviderProps {
  user: UserProfileSchemaType
  refreshUser: () => Promise<void>
}

const UserEditorCtx = createContext<ProviderProps | null>(null)

export const UserEditorProvider: React.FC<{
  children: React.ReactNode
  user: UserProfileSchemaType
}> = ({ children, user }) => {
  const utils = trpc.useContext()

  const [userInEdit, setUserInEdit] = useState(user)

  const refreshUser = useCallback(async (): Promise<void> => {
    const user = await utils.users.getUserProfile.fetch({
      customId: userInEdit.customId,
    })

    if (user) {
      setUserInEdit(user)
    }
  }, [userInEdit])

  return (
    <UserEditorCtx.Provider value={{ user: userInEdit, refreshUser }}>
      {children}
    </UserEditorCtx.Provider>
  )
}

export const useUserEditor = () =>
  useContext<ProviderProps>(UserEditorCtx as Context<ProviderProps>)
