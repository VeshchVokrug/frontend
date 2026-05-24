import { apiClient } from '@/shared/api/api-client'

export const deleteAdvertImages = async (
  listingId: string,
  imagesUrls: string[]
): Promise<void> => {
  await apiClient.delete(`/catalog/rentals/${listingId}/images`, {
    params: { imagesUrls },
  })
}
