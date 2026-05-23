import { QueryClient } from '@tanstack/react-query'
import { getRentalDetails } from './get-rental-details'

export const prefetchRentalDetails = async (
  queryClient: QueryClient,
  listingId: string
) => {
  await queryClient.prefetchQuery({
    queryKey: ['rental-details', listingId],
    queryFn: () => getRentalDetails(listingId),
  })
}
