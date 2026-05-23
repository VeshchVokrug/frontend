import { apiClient } from '@/shared/api/api-client'
import { CreateBookingPayload, BookingResponse, bookingResponseSchema } from '../model/schema'

export const createBooking = async (
  payload: CreateBookingPayload
): Promise<BookingResponse> => {
  const { data } = await apiClient.post<BookingResponse>('/rental/bookings', payload)

  const result = bookingResponseSchema.safeParse(data)

  if (!result.success) {
    console.error('Ошибка валидации ответа при создании бронирования:', result.error.issues)
    throw result.error
  }

  return result.data
}
