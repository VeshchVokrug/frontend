'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import Link from 'next/link'
import { useOrdersAsOwner, useOrdersAsTenant } from '@/entities/orders'
import {
  cancelOrder,
  approveOrder,
  rejectOrder,
} from '@/entities/orders/api/orders'
type Role = 'owner' | 'tenant'

interface ReasonDialog {
  orderId: string
  action: 'cancel' | 'reject'
}

export default function OrdersPage() {
  const [role, setRole] = useState<Role>('owner')
  const [reasonDialog, setReasonDialog] = useState<ReasonDialog | null>(null)
  const [reason, setReason] = useState<string>('')
  const queryClient = useQueryClient()

  const { data: ownerOrders, isLoading: isOwnerLoading } = useOrdersAsOwner()
  const { data: tenantOrders, isLoading: isTenantLoading } = useOrdersAsTenant()

  const orders =
    role === 'owner'
      ? ownerOrders?.bookings || []
      : tenantOrders?.bookings || []
  const isLoading = role === 'owner' ? isOwnerLoading : isTenantLoading

  const cancelMutation = useMutation({
    mutationFn: (id: string) => cancelOrder(id, reason),
    onSuccess: () => {
      toast.success('Заказ отменен')
      setReasonDialog(null)
      setReason('')
      queryClient.invalidateQueries({ queryKey: ['orders-tenant'] })
      queryClient.invalidateQueries({ queryKey: ['orders-owner'] })
    },
    onError: () => {
      toast.error('Ошибка при отмене заказа')
    },
  })

  const approveMutation = useMutation({
    mutationFn: approveOrder,
    onSuccess: () => {
      toast.success('Заказ подтвержден')
      queryClient.invalidateQueries({ queryKey: ['orders-owner'] })
      queryClient.invalidateQueries({ queryKey: ['orders-tenant'] })
    },
    onError: () => {
      toast.error('Ошибка при подтверждении')
    },
  })

  const rejectMutation = useMutation({
    mutationFn: (id: string) => rejectOrder(id, reason),
    onSuccess: () => {
      toast.success('Заказ отклонен')
      setReasonDialog(null)
      setReason('')
      queryClient.invalidateQueries({ queryKey: ['orders-owner'] })
      queryClient.invalidateQueries({ queryKey: ['orders-tenant'] })
    },
    onError: () => {
      toast.error('Ошибка при отклонении')
    },
  })

  const formatDate = (date: { year: number; month: number; day: number }) => {
    return `${date.day}.${date.month.toString().padStart(2, '0')}.${date.year}`
  }

  const handleCancelClick = (orderId: string) => {
    setReasonDialog({ orderId, action: 'cancel' })
    setReason('')
  }

  const handleRejectClick = (orderId: string) => {
    setReasonDialog({ orderId, action: 'reject' })
    setReason('')
  }

  const handleConfirmReason = () => {
    if (!reasonDialog) return

    if (reasonDialog.action === 'cancel') {
      cancelMutation.mutate(reasonDialog.orderId)
    } else {
      rejectMutation.mutate(reasonDialog.orderId)
    }
  }

  return (
    <main className="mx-auto w-full max-w-425 pb-10">
      <h1 className="mb-8 text-4xl font-bold">Актуальные заказы</h1>

      <div className="mb-8 flex gap-4">
        <button
          onClick={() => setRole('owner')}
          className={`rounded-3xl px-6 py-3 font-semibold transition ${
            role === 'owner'
              ? 'bg-main text-white'
              : 'bg-gray hover:bg-gray-200'
          }`}
        >
          Мои объявления
        </button>
        <button
          onClick={() => setRole('tenant')}
          className={`rounded-3xl px-6 py-3 font-semibold transition ${
            role === 'tenant'
              ? 'bg-main text-white'
              : 'bg-gray hover:bg-gray-200'
          }`}
        >
          Мои заказы
        </button>
      </div>

      {isLoading ? (
        <div className="py-8 text-center">Загрузка...</div>
      ) : orders.length === 0 ? (
        <div className="py-8 text-center text-gray-500">
          {role === 'owner' ? 'Нет новых заказов' : 'Нет активных заказов'}
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
                    <p
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        (order.status === 'Created' || order.status === 'PendingApproval')
                          ? 'bg-yellow-100 text-yellow-800'
                          : order.status === 'Confirmed'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'Cancelled'
                              ? 'bg-red-100 text-red-800'
                              : order.status === 'Rejected'
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {(order.status === 'Created' || order.status === 'PendingApproval') && 'Ожидает'}
                      {order.status === 'Confirmed' && 'Подтверждено'}
                      {order.status === 'Cancelled' && 'Отменено'}
                      {order.status === 'Rejected' && 'Отклонено'}
                      {![
                        'Created',
                        'PendingApproval',
                        'Confirmed',
                        'Cancelled',
                        'Rejected',
                      ].includes(order.status) && order.status}
                    </p>
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <p className="text-main text-3xl font-bold">
                    {order.totalPrice}
                    <span className="ml-1">₽</span>
                  </p>
                </div>

                {order.hasCancellationReason ||
                  (order.cancellationReason && (
                    <div
                      className="rounded bg-gray-50 p-3"
                      onClick={(e) => e.preventDefault()}
                    >
                      <p className="font-semibold">Причина отмены:</p>
                      <p className="mt-1 text-gray-800">
                        {order.cancellationReason}
                      </p>
                    </div>
                  ))}

                {(role === 'tenant' || role === 'owner') &&
                  (order.status === 'Created' || order.status === 'PendingApproval') && (
                    <div
                      className="mt-4 flex gap-3"
                      onClick={(e) => e.preventDefault()}
                    >
                      {role === 'tenant' && (
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            handleCancelClick(order.id)
                          }}
                          disabled={cancelMutation.isPending}
                          className="flex-1 rounded-2xl bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-400 disabled:bg-gray-400"
                        >
                          {cancelMutation.isPending
                            ? 'Отмена...'
                            : 'Отменить заказ'}
                        </button>
                      )}

                      {role === 'owner' && (
                        <>
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              approveMutation.mutate(order.id)
                            }}
                            disabled={approveMutation.isPending}
                            className="flex-1 rounded-2xl bg-green-500 px-4 py-3 font-semibold text-white transition hover:bg-green-600 disabled:bg-gray-400"
                          >
                            {approveMutation.isPending
                              ? 'Подтверждение...'
                              : 'Подтвердить'}
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              handleRejectClick(order.id)
                            }}
                            disabled={rejectMutation.isPending}
                            className="flex-1 rounded-2xl bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600 disabled:bg-gray-400"
                          >
                            {rejectMutation.isPending
                              ? 'Отклонение...'
                              : 'Отклонить'}
                          </button>
                        </>
                      )}
                    </div>
                  )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {reasonDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">
              {reasonDialog.action === 'cancel'
                ? 'Отмена заказа'
                : 'Отклонение заказа'}
            </h2>
            <p className="mb-6 text-gray-600">
              {reasonDialog.action === 'cancel'
                ? 'Укажите причину отмены (опционально)'
                : 'Укажите причину отклонения (опционально)'}
            </p>

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Введите причину..."
              className="focus:border-main mb-6 w-full rounded-2xl border border-gray-300 p-3 focus:outline-none"
              rows={4}
            />

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setReasonDialog(null)
                  setReason('')
                }}
                className="bg-gray flex-1 rounded-2xl px-4 py-3 font-semibold transition hover:bg-gray-200"
              >
                Отмена
              </button>
              <button
                onClick={handleConfirmReason}
                disabled={cancelMutation.isPending || rejectMutation.isPending}
                className="bg-main hover:bg-main-hover flex-1 rounded-2xl px-4 py-3 font-semibold text-white transition disabled:bg-gray-400"
              >
                Подтвердить
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
