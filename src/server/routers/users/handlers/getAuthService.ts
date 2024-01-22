import { procedure } from '@/server/trpc'
import { z } from 'zod'
import { isUserValid } from '../utils/isUserValid'
import { ConnectionsSchema } from '@/schemas/ConnectionSchema'
import { getRequestURL as getSteamRequestURL } from '@/services/Auth/Steam'
import { getRequestURL as getDiscordRequestURL } from '@/services/Auth/Discord'

const ServiceInputSchema = z.object({
  connection: ConnectionsSchema,
})

const ServiceOutputSchema = z.string().nullable()

export const getAuthService = procedure
  .input(ServiceInputSchema)
  .output(ServiceOutputSchema)
  .mutation(async ({ input, ctx }) => {
    const { supabase, session } = ctx

    if (!supabase || !session || !isUserValid(session)) return null

    switch (input.connection) {
      case 'DISCORD':
        return getDiscordRequestURL()
      case 'STEAM':
        return await getSteamRequestURL()
    }
  })
