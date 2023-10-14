import { createContext } from '@/server/context'
import { inferAsyncReturnType } from '@trpc/server'

export const revalidateServer = async (
  ctx: inferAsyncReturnType<typeof createContext>,
  joinId: string,
): Promise<void> => {
  const { res } = ctx

  if (res) {
    try {
      await res.revalidate(`/servers/${joinId}`)
    } catch (err) {}
  }
}
