'use client'

import { useMemo } from 'react'
import { useCurrentUser } from '@/entities/user/model/use-current-user'
import { useUserRentals } from '@/entities/advert'
import AdvertList from '@/widgets/advert-list'

export default function UserAdverts() {
  const { data: currentUser } = useCurrentUser()
  const { data: rentals, isLoading, error } = useUserRentals(currentUser?.id)

  const advertList = useMemo(() => {
    if (!rentals?.items) return []
    return rentals.items.map((item) => ({
      id: item.listingId,
      title: item.title,
      category: 'general',
      image: item.imageUrl ?? '',
      price: item.pricePerDay,
    }))
  }, [rentals])

  return (
    <main className="w-full">
      <h1 className="mb-8 text-[36px] font-bold">Мои вещи</h1>
      {isLoading && <div>Загрузка...</div>}
      {error && <div>Ошибка при загрузке вещей</div>}
      {advertList.length > 0 && <AdvertList advertList={advertList} />}
      {!isLoading && advertList.length === 0 && !error && (
        <div>У вас нет опубликованных вещей</div>
      )}
    </main>
  )
}
