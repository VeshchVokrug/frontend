import { apiClient } from '@/shared/api/api-client'

export const deleteAdvert = async (listingId: string): Promise<void> => {
  await apiClient.delete(`/catalog/rentals/${listingId}`)
}
