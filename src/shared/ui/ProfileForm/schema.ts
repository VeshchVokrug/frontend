import { z } from 'zod'

export const profileFormSchema = z.object({
  name: z.string().min(1, 'Введите имя'),
  bio: z.string().optional().default(''),
  phoneNumber: z
    .string()
    .regex(/^\+7\s?\(?\d{3}\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/, {
      message: 'Введите корректный номер телефона',
    })
    .optional()
    .or(z.literal(''))
    .default(''),
})

export type ProfileFormData = z.infer<typeof profileFormSchema>
