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
  isFollower: boolean
  followUser: () => Promise<void>
  unfollowUser: () => Promise<void>
  registerViewToUser: () => Promise<void>
}

const UserViewCtx = createContext<ProviderProps | null>(null)

export const UserViewProvider: React.FC<{
  children: React.ReactNode
  user: UserProfileSchemaType
}> = ({ children, user }) => {
  const [userToView, setUserToView] = useState(user)
  const { data: isFollower, refetch } = trpc.users.isUserFollower.useQuery({
    userId: userToView.id,
  })

  const viewUser = trpc.users.viewUser.useMutation()
  const followUserTrigger = trpc.users.followUser.useMutation()
  const unfollowUserTrigger = trpc.users.unfollowUser.useMutation()

  const registerViewToUser = useCallback(async (): Promise<void> => {
    const isRegistered = await viewUser.mutateAsync({ userId: userToView.id })

    if (!isRegistered) return

    setUserToView((user) => ({
      ...user,
      page: {
        ...user.page,
        statistics: {
          ...user.page.statistics,
          views: user.page.statistics.views + 1,
        },
      },
    }))
  }, [userToView, viewUser])

  const followUser = useCallback(async (): Promise<void> => {
    const isFollowed = await followUserTrigger.mutateAsync({
      userId: userToView.id,
    })

    if (!isFollowed) return

    setUserToView((user) => ({
      ...user,
      page: {
        ...user.page,
        statistics: {
          ...user.page.statistics,
          followers: user.page.statistics.followers + 1,
        },
      },
    }))

    refetch()
  }, [userToView, followUserTrigger, refetch])

  const unfollowUser = useCallback(async (): Promise<void> => {
    const isUnfollowed = await unfollowUserTrigger.mutateAsync({
      userId: userToView.id,
    })

    if (!isUnfollowed) return

    setUserToView((user) => ({
      ...user,
      page: {
        ...user.page,
        statistics: {
          ...user.page.statistics,
          followers: user.page.statistics.followers - 1,
        },
      },
    }))

    refetch()
  }, [userToView, refetch, unfollowUserTrigger])

  return (
    <UserViewCtx.Provider
      value={{
        user: userToView,
        isFollower: !!isFollower,
        followUser,
        unfollowUser,
        registerViewToUser,
      }}
    >
      {children}
    </UserViewCtx.Provider>
  )
}

export const useUserView = () =>
  useContext<ProviderProps>(UserViewCtx as Context<ProviderProps>)
