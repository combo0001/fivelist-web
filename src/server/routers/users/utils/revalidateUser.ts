import { createContext } from '@/server/context'
import { inferAsyncReturnType } from '@trpc/server'
import { getUserCustomId } from './getUserCustomId'

interface UserProps {
  id?: string
  customId?: string
}

export const revalidateUser = async (
  ctx: inferAsyncReturnType<typeof createContext>,
  user: UserProps,
): Promise<void> => {
  const { res } = ctx

  if (res) {
    let customId: string | null = null

    if (user.customId) {
      customId = user.customId
    } else if (user.id) {
      if (!ctx.supabase) return

      customId = await getUserCustomId(ctx.supabase, user.id)
    }

    if (!customId) return

    try {
      await res.revalidate(`/users/${user.customId}`)
    } catch (err) {}
  }
}
