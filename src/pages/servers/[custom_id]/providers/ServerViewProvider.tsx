import { ServerDynamicSchemaType } from '@/schemas/servers/DynamicSchema'
import { ServerProfileSchemaType } from '@/schemas/servers/ProfileSchema'
import { ServerReviewSchemaType, ServerReviewsSchemaType } from '@/schemas/servers/ReviewsSchema'
import { UserIdentitySchemaType } from '@/schemas/users/IdentitySchema'
import { getMasterListServer } from '@/services/Fivem'
import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/navigation'
import React, { Context, createContext, useCallback, useContext, useEffect, useState } from 'react'

interface ProviderProps {
  serverView: ServerProfileSchemaType
  serverReviews: ServerReviewsSchemaType | null
  serverDynamic: ServerDynamicSchemaType | null
  createServerReview: (content: string, rating: number) => Promise<void>
  createServerReplyOfReview: (reviewId: string, content: string) => Promise<void>
  showMoreReviews: () => Promise<void>
}

const ServerViewCtx = createContext<ProviderProps | null>(null)

export const ServerViewProvider: React.FC<{
  children: React.ReactNode
  server: ServerProfileSchemaType
}> = ({ children, server }) => {
  const [serverDynamic, setServerDynamic] = useState<ServerDynamicSchemaType | null>(null)

  const router = useRouter()

  const createReview = trpc.servers.createServerReview.useMutation()
  const createReplyOfUser = trpc.servers.createServerReplyOfReview.useMutation()

  const utils = trpc.useContext()

  const [serverReviews, setServerReviews] = useState<ServerReviewsSchemaType | null>(null)

  const createServerReview = useCallback(
    async (content: string, rating: number): Promise<void> => {
      await createReview.mutateAsync({
        joinId: server.joinId,
        pageId: server.page.id,
        content,
        rating
      })

      const reviewsRefetch = await utils.servers.getServerReviews.fetch({
        pageId: server.page.id, 
        offset: {
          from: new Date().toISOString(), 
          amount: 5
        }
      })

      if (reviewsRefetch) {
        setServerReviews(reviewsRefetch)
      }
    },
    []
  )

  const createServerReplyOfReview = useCallback(
    async (reviewId: string, content: string): Promise<void> => {
      await createReplyOfUser.mutateAsync({
        joinId: server.joinId,
        reviewId,
        content
      })

      const reviewsRefetch = await utils.servers.getServerReviews.fetch({
        pageId: server.page.id, 
        offset: {
          from: new Date().toISOString(), 
          amount: 5
        }
      })

      if (reviewsRefetch) {
        setServerReviews(reviewsRefetch)
      }
    },
    []
  )

  const showMoreReviews = useCallback(
    async (): Promise<void> => {
      const lastReview = serverReviews?.at(-1)

      if (!lastReview) return

      const reviewsRefetch = await utils.servers.getServerReviews.fetch({
        pageId: server.page.id, 
        offset: {
          from: lastReview.createdAt, 
          amount: 5
        }
      })

      if (reviewsRefetch) {
        setServerReviews(reviewsRefetch)
      }
    },
    []
  )
  
  useEffect(() => {
    if (serverDynamic) return

    getMasterListServer(server.joinId)
      .then((serverDynamic) => {
        if (!serverDynamic) return router.push('/home')

        setServerDynamic(serverDynamic)
      })
  }, [ serverDynamic ])

  useEffect(() => {
    if (serverReviews) return

    utils.servers.getServerReviews.fetch({
      pageId: server.page.id, 
      offset: {
        from: new Date().toISOString(), 
        amount: 5
      }
    })
      .then((serverReviews) => {
        if (!serverReviews) return  
        console.log(serverReviews)

        setServerReviews(serverReviews)
      })
  }, [ serverReviews ])

  return (
    <ServerViewCtx.Provider value={{ 
      serverView: server,
      serverReviews,
      serverDynamic,
      createServerReview,
      createServerReplyOfReview,
      showMoreReviews
    }}>
      {children}
    </ServerViewCtx.Provider>
  )
}

export const useServerView = () =>
  useContext<ProviderProps>(ServerViewCtx as Context<ProviderProps>)
