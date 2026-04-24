import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  bio: z.string().optional(),
  avatarUrl: z.string().nullable().optional(),
  favoriteCategories: z.array(z.string()).optional(),
})

export type User = z.infer<typeof userSchema>
