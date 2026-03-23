import { apiClient } from '@/shared/api/api-client'
import { User, userSchema } from '../model/schema'

export const getCurrentUser = async (): Promise<User> => {
  const { data } = await apiClient.get<User>('/me')
  return userSchema.parse(data)
}
