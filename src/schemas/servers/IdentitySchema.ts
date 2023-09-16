import { z } from 'zod'

export const ServerIdSchema = z.number().int()

export type ServerIdSchemaType = z.infer<typeof ServerIdSchema>

export const JoinIdSchema = z.string().length(6).regex(/^[a-zA-Z0-9]{6}$/)

export type JoinIdSchemaType = z.infer<typeof JoinIdSchema>