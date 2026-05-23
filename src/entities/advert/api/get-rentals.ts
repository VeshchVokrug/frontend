import { apiClient } from '@/shared/api/api-client'
import {
  RentalsQueryParams,
  rentalsResponseSchema,
  RentalsResponse,
} from '../model/schema'

export const getRentals = async (
  params: RentalsQueryParams
): Promise<RentalsResponse> => {
  const { data } = await apiClient.get<RentalsResponse>('/catalog/rentals', {
    params: {
      searchTerm: params.searchTerm,
      city: params.city,
      categorySlug: params.categorySlug,
      minPrice: params.minPrice,
      maxPrice: params.maxPrice,
      minRating: params.minRating,
      'StartDate.Year': params['startDate.year'],
      'StartDate.Month': params['startDate.month'],
      'StartDate.Day': params['startDate.day'],
      'EndDate.Year': params['endDate.year'],
      'EndDate.Month': params['endDate.month'],
      'EndDate.Day': params['endDate.day'],
      pageNumber: params.pageNumber,
      pageSize: params.pageSize,
    },
  })

  const result = rentalsResponseSchema.safeParse(data)

  if (!result.success) {
    console.error('Ошибка валидации списка объявлений:', result.error.issues)
    throw result.error
  }

  return result.data
}
