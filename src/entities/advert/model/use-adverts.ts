import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { getAdverts } from '../api/get-adverts'
import { AdvertsQueryParams, AdvertsResponse } from './schema'
import { AxiosError } from 'axios'

export const useAdverts = (
  params: Partial<AdvertsQueryParams>,
  options?: {
    enabled?: boolean
  }
): UseQueryResult<AdvertsResponse, AxiosError> => {
  return useQuery({
    queryKey: ['adverts', params],
    queryFn: () => getAdverts(params as AdvertsQueryParams),
    enabled: options?.enabled !== false,
    staleTime: 5 * 60 * 1000,
  })
}
