import { useQuery } from '@tanstack/react-query'
import {
  getOrdersAsOwner,
  getOrdersAsTenant,
  getCompletedOrdersAsOwner,
  getCompletedOrdersAsTenant,
} from '../api/orders'
import { OrdersResponse } from './schema'

export const useOrdersAsOwner = () => {
  return useQuery<OrdersResponse>({
    queryKey: ['orders-owner'],
    queryFn: getOrdersAsOwner,
  })
}

export const useOrdersAsTenant = () => {
  return useQuery<OrdersResponse>({
    queryKey: ['orders-tenant'],
    queryFn: getOrdersAsTenant,
  })
}

export const useCompletedOrdersAsOwner = () => {
  return useQuery<OrdersResponse>({
    queryKey: ['orders-owner-completed'],
    queryFn: getCompletedOrdersAsOwner,
  })
}

export const useCompletedOrdersAsTenant = () => {
  return useQuery<OrdersResponse>({
    queryKey: ['orders-tenant-completed'],
    queryFn: getCompletedOrdersAsTenant,
  })
}
