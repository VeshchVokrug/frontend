import { z } from 'zod'

export const registerSchema = z
  .object({
    email: z.string().email('Введите корректный email'),
    password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })

export const authResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
})

export type RegisterInputData = z.infer<typeof registerSchema>
export type AuthResponse = z.infer<typeof authResponseSchema>
