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
  subcategory: z.string().min(1, 'Выберите подкатегорию'),
  price: z.number().positive('Цена должна быть положительным числом'),
  availableDates: z.array(z.string()).nonempty('Выберите хотя бы одну дату'),
  photos: z
    .array(z.string())
    .max(5, 'Максимальное количество фотографий - 5')
    .optional(),
})

export type CreateAdvertInputData = z.infer<typeof createAdvertSchema>
