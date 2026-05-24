import { apiClient } from '@/shared/api/api-client'
import { editProfileInputData } from '../model/schema'
import { User } from '@/entities/user/model/schema'

export const editProfile = async ({
  name,
  bio,
  phoneNumber,
  avatarUrl,
}: editProfileInputData): Promise<User> => {
  const { data } = await apiClient.put<User>('/identity/profile', {
    name,
    bio,
    phoneNumber,
    avatarUrl,
  })

  return data
}
