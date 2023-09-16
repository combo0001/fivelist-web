import { z } from 'zod'

import { ServerCitizenSchema } from './CitizenSchema'
import { ServerPreviewSchema } from './PreviewSchema'

export const ServerViewSchema = z.object({
  preview: ServerPreviewSchema.nullable(),
  cfx: ServerCitizenSchema,
})

export type ServerViewSchemaType = z.infer<typeof ServerViewSchema>

export const ServerViewsSchema = z.array(ServerViewSchema)

export type ServerViewsSchemaType = z.infer<typeof ServerViewsSchema>
