import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Неккорректный email'),
  password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
})

export const authResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

export type LoginInputData = z.infer<typeof loginSchema>
export type AuthResponse = z.infer<typeof authResponseSchema>
