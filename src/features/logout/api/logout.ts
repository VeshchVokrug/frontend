import { apiClient } from '@/shared/api/api-client'
import { tokenStorage } from '@/shared/lib/tokens'

export const logout = async (): Promise<void> => {
  await apiClient.post<void>('/identity/auth/logout', {
    refreshToken: tokenStorage.getRefreshToken(),
  })
}
