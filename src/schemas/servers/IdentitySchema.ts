import { z } from 'zod'

export const ServerIdSchema = z.string().uuid()

export type ServerIdSchemaType = z.infer<typeof ServerIdSchema>

export const ServerJoinIdSchema = z.string().length(6).regex(/^[a-zA-Z0-9]{6}$/)

export type ServerJoinIdSchemaType = z.infer<typeof ServerJoinIdSchema>

export const ServerCustomIdSchema = z.string().max(32)

export type ServerCustomIdSchemaType = z.infer<typeof ServerCustomIdSchema>