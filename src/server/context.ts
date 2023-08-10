import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'

export async function createContext(_opts: trpcNext.CreateNextContextOptions) {
  return _opts
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>
