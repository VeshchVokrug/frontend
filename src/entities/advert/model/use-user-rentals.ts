import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { getUserRentals } from '../api/get-user-rentals'
import { UserRentalsResponse } from './schema'
import { AxiosError } from 'axios'

export const useUserRentals = (
  ownerId: string | undefined,
  options?: {
    enabled?: boolean
  }
): UseQueryResult<UserRentalsResponse, AxiosError> => {
  return useQuery({
    queryKey: ['user-rentals', ownerId],
    queryFn: () => getUserRentals(ownerId!),
    enabled: options?.enabled !== false && !!ownerId,
  })
}
