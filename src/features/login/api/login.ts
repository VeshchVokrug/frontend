import { apiClient } from '@/shared/api/api-client'
import { tokenStorage } from '@/shared/lib/tokens'
import { AuthResponse, LoginInputData } from '../model/schema'

export const login = async ({
  email,
  password,
}: LoginInputData): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>('identity/auth/login', {
    email,
    password,
  })
  tokenStorage.setTokens(data.accessToken, data.refreshToken)
  return data
}
