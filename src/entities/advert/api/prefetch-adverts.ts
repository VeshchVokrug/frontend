import { QueryClient } from '@tanstack/react-query'
import { getAdverts } from './get-adverts'
import { AdvertsQueryParams } from '../model/schema'

export const prefetchAdverts = async (
  queryClient: QueryClient,
  params: AdvertsQueryParams
) => {
  await queryClient.prefetchQuery({
    queryKey: ['adverts', params],
    queryFn: () => getAdverts(params),
    staleTime: 5 * 60 * 1000,
  })
}
