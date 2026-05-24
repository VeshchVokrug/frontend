import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { getAdvertDetails } from '../api/get-advert-details'
import { AdvertDetails } from './schema'

export const useAdvertDetails = (
  listingId: string,
  options?: {
    enabled?: boolean
  }
): UseQueryResult<AdvertDetails, Error> => {
  return useQuery({
    queryKey: ['advert-details', listingId],
    queryFn: () => getAdvertDetails(listingId),
    enabled: options?.enabled !== false && !!listingId,
  })
}
