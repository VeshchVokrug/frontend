import z from 'zod'

export const createAdvertSchema = z.object({
  name: z
    .string()
    .min(2, 'Название должно содержать не менее 2 символов')
    .max(100, 'Название должно содержать не более 100 символов'),
  description: z
    .string()
    .max(300, 'Описание должно содержать не более 300 символов'),
  category: z.string().min(1, 'Выберите категорию'),
  subcategory: z.string().optional(),
  price: z.number().positive('Цена должна быть положительным числом'),
  city: z
    .string()
    .min(2, 'Город должен содержать не менее 2 символов')
    .max(50, 'Город должен содержать не более 50 символов'),
  phone: z
    .string()
    .min(10, 'Номер телефона должен содержать не менее 10 цифр')
    .optional()
    .or(z.literal('')),
  busyDates: z.array(z.string()).optional(),
  photos: z
    .array(z.string())
    .max(5, 'Максимальное количество фотографий - 5')
    .optional(),
})

export type CreateAdvertInputData = z.infer<typeof createAdvertSchema>

export interface CreateAdvertPayload extends CreateAdvertInputData {
  managerId: string
  managerName: string
}

export interface CreateAdvertResponse {
  listingId: string
}
