'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCompletedOrdersAsOwner, useCompletedOrdersAsTenant } from '@/entities/orders'

type Role = 'owner' | 'tenant'

export default function PreviousOrdersPage() {
  const [role, setRole] = useState<Role>('owner')

  const { data: ownerOrders, isLoading: isOwnerLoading } = useCompletedOrdersAsOwner()
  const { data: tenantOrders, isLoading: isTenantLoading } = useCompletedOrdersAsTenant()

  const orders =
    role === 'owner'
      ? ownerOrders?.bookings || []
      : tenantOrders?.bookings || []
  const isLoading = role === 'owner' ? isOwnerLoading : isTenantLoading

  const formatDate = (date: { year: number; month: number; day: number }) => {
    return `${date.day}.${date.month.toString().padStart(2, '0')}.${date.year}`
  }

  return (
    <main className="mx-auto w-full max-w-425 pb-10">
      <h1 className="mb-8 text-4xl font-bold">Предыдущие заказы</h1>

      <div className="mb-8 flex gap-4">
        <button
          onClick={() => setRole('owner')}
          className={`rounded-3xl px-6 py-3 font-semibold transition ${
            role === 'owner'
              ? 'bg-main text-white'
              : 'bg-gray hover:bg-gray-200'
          }`}
        >
          Сданные вещи
        </button>
        <button
          onClick={() => setRole('tenant')}
          className={`rounded-3xl px-6 py-3 font-semibold transition ${
            role === 'tenant'
              ? 'bg-main text-white'
              : 'bg-gray hover:bg-gray-200'
          }`}
        >
          Арендованные вещи
        </button>
      </div>

      {isLoading ? (
        <div className="py-8 text-center">Загрузка...</div>
      ) : orders.length === 0 ? (
        <div className="py-8 text-center text-gray-500">
          {role === 'owner' ? 'Нет предыдущих заказов на сданные вещи' : 'Нет предыдущих заказов на арендованные вещи'}
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/catalog/${order.listingId}`}
              className="bg-gray shadow-shadow group relative flex flex-col rounded-3xl transition hover:shadow-md"
            >
              <div className="flex flex-col gap-4 p-8">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="mb-2 text-sm text-gray-600">
                      Объявление ID: {order.listingId}
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      {formatDate(order.startDate)} -{' '}
                      {formatDate(order.endDate)}
                    </p>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-semibold">
                      Завершено
                    </p>
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <p className="text-main text-3xl font-bold">
                    {order.totalPrice}
                    <span className="ml-1">₽</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
