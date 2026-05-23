import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { getRentals } from '../api/get-rentals'
import { RentalsQueryParams, RentalsResponse } from './schema'
import { AxiosError } from 'axios'

export const useRentals = (
  params: Partial<RentalsQueryParams>,
  options?: {
    enabled?: boolean
  }
): UseQueryResult<RentalsResponse, AxiosError> => {
  return useQuery({
    queryKey: ['rentals', params],
    queryFn: () => getRentals(params as RentalsQueryParams),
    enabled: options?.enabled !== false,
    staleTime: 5 * 60 * 1000,
  })
}
