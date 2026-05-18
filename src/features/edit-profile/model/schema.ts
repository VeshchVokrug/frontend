import z from 'zod'

export const editProfileSchema = z.object({
  name: z
    .string()
    .min(2, 'Имя должно содержать не менее 2 символов')
    .max(30, 'Имя должно содержать не более 30 символов'),
  bio: z
    .string()
    .max(300, 'Информация о себе должна содержать не более 300 символов')
    .optional(),
  avatarPath: z.string().optional(),
  phone: z.string().optional(),
})

export type editProfileInputData = z.infer<typeof editProfileSchema>
