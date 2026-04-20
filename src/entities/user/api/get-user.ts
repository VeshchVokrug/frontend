import { apiClient } from '@/shared/api/api-client'
import { User, userSchema } from '../model/schema'

export const getUser = async (id: string): Promise<User> => {
  const { data } = await apiClient.get<User>(`/identity/profile/${id}`)

  return userSchema.parse(data)
}
