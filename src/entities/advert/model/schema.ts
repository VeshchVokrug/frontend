import { z } from 'zod'

export const advertSchema = z.object({
  id: z.string(),
  category: z.string(),
  title: z.string(),
  image: z.string(),
  price: z.number().min(0),
})

export const advertPhotosSchema = z.array(
  z.object({
    id: z.number(),
    img: z.string(),
  })
)

export type Advert = z.infer<typeof advertSchema>
export type AdvertPhotos = z.infer<typeof advertPhotosSchema>
