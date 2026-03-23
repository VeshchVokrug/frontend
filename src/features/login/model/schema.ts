import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Неккорректный email'),
  password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
})

export type LoginInputData = z.infer<typeof loginSchema>
