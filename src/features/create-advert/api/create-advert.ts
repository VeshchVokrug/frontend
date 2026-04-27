import { apiClient } from '@/shared/api/api-client'
import { CreateAdvertInputData } from '../model/schema'
import { Advert } from '@/entities/advert'

export const createAdvert = async ({
  name,
  description,
  category,
  subcategory,
  price,
  availableDates,
  photos,
}: CreateAdvertInputData): Promise<Advert> => {
  const { data } = await apiClient.post<Advert>('/identity/profile', {
    name,
    description,
    category,
    subcategory,
    price,
    availableDates,
    photos,
  })

  return data
}
