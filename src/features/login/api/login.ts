import { apiClient } from '@/shared/api/api-client'
import { LoginInputData } from '../model/schema'

export const login = async ({
  email,
  password,
}: LoginInputData): Promise<unknown> => {
  const { data } = await apiClient.post<unknown>('/login', {
    email,
    password,
  })
  return data
}
