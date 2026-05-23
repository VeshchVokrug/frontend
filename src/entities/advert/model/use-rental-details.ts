import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { getRentalDetails } from '../api/get-rental-details'
import { RentalDetails } from './schema'

export const useRentalDetails = (
  listingId: string,
  options?: {
    enabled?: boolean
  }
): UseQueryResult<RentalDetails, Error> => {
  return useQuery({
    queryKey: ['rental-details', listingId],
    queryFn: () => getRentalDetails(listingId),
    enabled: options?.enabled !== false && !!listingId,
  })
}
