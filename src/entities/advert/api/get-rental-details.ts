import { apiClient } from '@/shared/api/api-client'
import { RentalDetails, rentalDetailsSchema } from '../model/schema'

export const getRentalDetails = async (
  listingId: string
): Promise<RentalDetails> => {
  const { data } = await apiClient.get<RentalDetails>(
    `/catalog/rentals/${listingId}`
  )

  const result = rentalDetailsSchema.safeParse(data)

  if (!result.success) {
    console.error(
      'Ошибка валидации данных объявления:',
      result.error.issues
    )
    throw result.error
  }

  return result.data
}
