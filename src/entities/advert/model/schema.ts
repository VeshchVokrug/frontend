import { z } from 'zod'

export const advertSchema = z.object({
  id: z.string(),
  category: z.string(),
  title: z.string(),
  image: z.string(),
  price: z.number().min(0),
})

export type Advert = z.infer<typeof advertSchema>
