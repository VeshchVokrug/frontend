'use client'

import { useMemo } from 'react'
import { useCurrentUser } from '@/entities/user/model/use-current-user'
import { useUserAdverts, useDeleteAdvert } from '@/entities/advert'
import AdvertList from '@/widgets/advert-list'
import { queryClient } from '@/app/providers/query-provider'

export default function UserAdverts() {
  const { data: currentUser } = useCurrentUser()
  const { data: adverts, isLoading, error } = useUserAdverts(currentUser?.id)
  const { mutateAsync: deleteAdvert } = useDeleteAdvert()

  const handleDelete = async (id: string) => {
    await deleteAdvert(id)
    queryClient.invalidateQueries({ queryKey: ['user-adverts', currentUser?.id] })
  }

  const advertList = useMemo(() => {
    if (!adverts?.items) return []
    return adverts.items.map((item) => ({
      id: item.listingId,
      title: item.title,
      category: 'general',
      image: item.imageUrl ?? '',
      price: item.pricePerDay,
    }))
  }, [adverts])

  return (
    <main className="w-full">
      <h1 className="mb-8 text-[36px] font-bold">Мои вещи</h1>
      {isLoading && <div>Загрузка...</div>}
      {error && <div>Ошибка при загрузке вещей</div>}
      {advertList.length > 0 && (
        <AdvertList
          advertList={advertList}
          onDelete={handleDelete}
          showDeleteButton={true}
        />
      )}
      {!isLoading && advertList.length === 0 && !error && (
        <div>У вас нет опубликованных вещей</div>
      )}
    </main>
  )
}
