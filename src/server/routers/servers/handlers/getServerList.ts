import { procedure } from '@/server/trpc'
import { z } from 'zod'

const ServerListInputSchema = z.undefined()
const ServerListOutputSchema = z.object({})

export const getServerList = procedure
  .input(ServerListInputSchema)
  .output(ServerListOutputSchema)
  .query(async ({ ctx }) => {
    return {}
  })
