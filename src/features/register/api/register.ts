import { apiClient } from '@/shared/api/api-client'
import { tokenStorage } from '@/shared/lib/tokens'
import { AuthResponse, RegisterInputData } from '../model/schema'

export const register = async ({
  email,
  password,
}: Omit<RegisterInputData, 'confirmPassword'>): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>('/identity/auth/register', {
    email,
    password,
  })
  tokenStorage.setTokens(data.accessToken, data.refreshToken)
  return data
}
