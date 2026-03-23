import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  bio: z.string().optional(),
  favoriteCategories: z.array(z.string()).optional(),
  role: z.string(),
})

export type User = z.infer<typeof userSchema>
