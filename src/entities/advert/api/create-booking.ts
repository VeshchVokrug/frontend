import { apiClient } from '@/shared/api/api-client'
import { CreateOrderPayload, OrderResponse, orderResponseSchema } from '../model/schema'

export const createOrder = async (
  payload: CreateOrderPayload
): Promise<OrderResponse> => {
  const { data } = await apiClient.post<OrderResponse>('/rental/bookings', payload)

  const result = orderResponseSchema.safeParse(data)

  if (!result.success) {
    console.error('Ошибка валидации ответа при создании заказа:', result.error.issues)
    throw result.error
  }

  return result.data
}
