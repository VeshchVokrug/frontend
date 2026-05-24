import { apiClient } from '@/shared/api/api-client'
import { UserAdvertsResponse, userAdvertsResponseSchema } from '../model/schema'

export const getUserAdverts = async (ownerId: string): Promise<UserAdvertsResponse> => {
  const { data } = await apiClient.get<UserAdvertsResponse>(
    `/catalog/rentals/by-user/${ownerId}`
  )

  const result = userAdvertsResponseSchema.safeParse(data)

  if (!result.success) {
    console.error('Ошибка валидации объявлений пользователя:', result.error.issues)
    throw result.error
  }

  return result.data
}
