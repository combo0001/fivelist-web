import { z } from 'zod'

export const ServerIdSchema = z.number().int()

export type ServerIdSchemaType = z.infer<typeof ServerIdSchema>

export const ServerJoinIdSchema = z.string().length(6).regex(/^[a-zA-Z0-9]{6}$/)

export type ServerJoinIdSchemaType = z.infer<typeof ServerJoinIdSchema>