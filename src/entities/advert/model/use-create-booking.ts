import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { CreateOrderPayload, OrderResponse } from './schema'
import { createOrder } from '../api/create-booking'

export const useCreateOrder = () => {
  return useMutation<OrderResponse, AxiosError, CreateOrderPayload>({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success('Заказ успешно создан')
    },
    onError: (error) => {
      const message = (error.response?.data as Record<string, unknown>)?.message || 'Ошибка при создании заказа'
      toast.error(String(message))
    },
  })
}
