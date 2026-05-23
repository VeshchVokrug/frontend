import { QueryClient } from '@tanstack/react-query'
import { getRentals } from './get-rentals'
import { RentalsQueryParams } from '../model/schema'

export const prefetchRentals = async (
  queryClient: QueryClient,
  params: RentalsQueryParams
) => {
  await queryClient.prefetchQuery({
    queryKey: ['rentals', params],
    queryFn: () => getRentals(params),
    staleTime: 5 * 60 * 1000,
  })
}
