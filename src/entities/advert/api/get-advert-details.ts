import { apiClient } from '@/shared/api/api-client'
import { AdvertDetails, advertDetailsSchema } from '../model/schema'

export const getAdvertDetails = async (
  listingId: string
): Promise<AdvertDetails> => {
  const { data } = await apiClient.get<AdvertDetails>(
    `/catalog/rentals/${listingId}`
  )

  const result = advertDetailsSchema.safeParse(data)

  if (!result.success) {
    console.error(
      'Ошибка валидации данных объявления:',
      result.error.issues
    )
    throw result.error
  }

  return result.data
}
