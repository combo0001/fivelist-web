import { z } from 'zod'

export const UserBannerFile = z.string().url()

export type UserBannerFileSchemaType = z.infer<typeof UserBannerFile>
