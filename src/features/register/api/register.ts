import { apiClient } from '@/shared/api/api-client'
import { RegisterInputData } from '../model/schema'

export const register = async ({
  email,
  password,
}: Omit<RegisterInputData, 'confirmPassword'>): Promise<unknown> => {
  const { data } = await apiClient.post<unknown>('/register', {
    email,
    password,
  })
  return data
}
