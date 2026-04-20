import { apiClient } from '@/shared/api/api-client'
import { createProfileInputData } from '../model/schema'
import { User } from '@/entities/user/model/schema'

export const createProfile = async ({
  name,
  bio,
  favoriteCategories,
}: createProfileInputData): Promise<User> => {
  const { data } = await apiClient.post<User>('/identity/profile', {
    name,
    bio,
    favoriteCategories,
  })

  return data
}
