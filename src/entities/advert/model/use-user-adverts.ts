import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { getUserAdverts } from '../api/get-user-adverts'
import { UserAdvertsResponse } from './schema'
import { AxiosError } from 'axios'

export const useUserAdverts = (
  ownerId: string | undefined,
  options?: {
    enabled?: boolean
  }
): UseQueryResult<UserAdvertsResponse, AxiosError> => {
  return useQuery({
    queryKey: ['user-adverts', ownerId],
    queryFn: () => getUserAdverts(ownerId!),
    enabled: options?.enabled !== false && !!ownerId,
  })
}
