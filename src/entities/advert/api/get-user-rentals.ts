import { apiClient } from '@/shared/api/api-client'
import { UserRentalsResponse, userRentalsResponseSchema } from '../model/schema'

export const getUserRentals = async (ownerId: string): Promise<UserRentalsResponse> => {
  const { data } = await apiClient.get<UserRentalsResponse>(
    `/catalog/rentals/by-user/${ownerId}`
  )

  const result = userRentalsResponseSchema.safeParse(data)

  if (!result.success) {
    console.error('Ошибка валидации объявлений пользователя:', result.error.issues)
    throw result.error
  }

  return result.data
}
