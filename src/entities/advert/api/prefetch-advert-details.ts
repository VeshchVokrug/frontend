import { QueryClient } from '@tanstack/react-query'
import { getAdvertDetails } from './get-advert-details'

export const prefetchAdvertDetails = async (
  queryClient: QueryClient,
  listingId: string
) => {
  await queryClient.prefetchQuery({
    queryKey: ['advert-details', listingId],
    queryFn: () => getAdvertDetails(listingId),
  })
}
