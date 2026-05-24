import { apiClient } from '@/shared/api/api-client'

export const deleteProfileAvatar = async (avatarUrl: string): Promise<void> => {
  await apiClient.delete('/identity/profile/avatar', {
    params: { avatarUrl },
  })
}
