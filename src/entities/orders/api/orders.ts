import { apiClient } from '@/shared/api/api-client'
import { OrdersResponse } from '../model/schema'

export const getOrdersAsOwner = async (): Promise<OrdersResponse> => {
  const { data } = await apiClient.get<OrdersResponse>('/rental/bookings/as-owner')
  return data
}

export const getOrdersAsTenant = async (): Promise<OrdersResponse> => {
  const { data } = await apiClient.get<OrdersResponse>('/rental/bookings/as-tenant')
  return data
}

export const getCompletedOrdersAsOwner = async (): Promise<OrdersResponse> => {
  const { data } = await apiClient.get<OrdersResponse>('/rental/bookings/as-owner/completed')
  return data
}

export const getCompletedOrdersAsTenant = async (): Promise<OrdersResponse> => {
  const { data } = await apiClient.get<OrdersResponse>('/rental/bookings/as-tenant/completed')
  return data
}

export const cancelOrder = async (id: string, cancellationReason?: string): Promise<void> => {
  await apiClient.post(`/rental/bookings/${id}/cancel`, JSON.stringify(cancellationReason || ''), {
    headers: { 'Content-Type': 'application/json' },
  })
}

export const approveOrder = async (id: string): Promise<void> => {
  await apiClient.post(`/rental/bookings/${id}/approve`, JSON.stringify(''), {
    headers: { 'Content-Type': 'application/json' },
  })
}

export const rejectOrder = async (id: string, cancellationReason?: string): Promise<void> => {
  await apiClient.post(`/rental/bookings/${id}/reject`, JSON.stringify(cancellationReason || ''), {
    headers: { 'Content-Type': 'application/json' },
  })
}
