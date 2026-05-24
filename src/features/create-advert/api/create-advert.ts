import { apiClient } from '@/shared/api/api-client'
import { formatBusyDates } from '@/shared/lib/format-busy-dates'
import { CreateAdvertPayload, CreateAdvertResponse } from '../model/schema'

export const createAdvert = async (
  advertData: CreateAdvertPayload
): Promise<CreateAdvertResponse> => {
  const {
    name,
    description,
    category,
    subcategory,
    price,
    city,
    busyDates,
    photos,
    phoneNumber,
    managerId,
    managerName,
  } = advertData
  const { data } = await apiClient.post<CreateAdvertResponse>('/catalog/rentals', {
    title: name,
    description,
    categorySlug: subcategory || category,
    imagesUrls: photos || [],
    city,
    defaultPrice: price,
    busyDates: formatBusyDates(busyDates || []),
    managerId,
    managerName,
    managerPhone: phoneNumber,
  })

  return data
}
