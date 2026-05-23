import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { CreateBookingPayload, BookingResponse } from './schema'
import { createBooking } from '../api/create-booking'

export const useCreateBooking = () => {
  return useMutation<BookingResponse, AxiosError, CreateBookingPayload>({
    mutationFn: createBooking,
    onSuccess: () => {
      toast.success('Бронирование успешно создано')
    },
    onError: (error) => {
      const message = (error.response?.data as Record<string, unknown>)?.message || 'Ошибка при создании бронирования'
      toast.error(String(message))
    },
  })
}
