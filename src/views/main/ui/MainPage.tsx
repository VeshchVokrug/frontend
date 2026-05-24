'use client'

import { useMemo } from 'react'
import CategoryCard from '@/shared/ui/CategoryCard'
import { CATEGORIES } from '@/shared/constants/categories'
import Header from '@/widgets/header'
import AdvertList from '@/widgets/advert-list'
import { useAdverts } from '@/entities/advert'

export default function MainPage() {
  const { data: adverts } = useAdverts({})

  const advertList = useMemo(() => {
    if (!adverts?.items) return []
    return adverts.items.map((item) => ({
      id: item.listingId,
      title: item.title,
      category: 'general',
      image: item.imageUrl ?? '/images/logo.png',
      price: item.pricePerDay,
    }))
  }, [adverts])

  return (
    <>
      <Header />
      <main className="w-full max-w-425">
        <div className="mb-20 grid h-75 grid-cols-32 grid-rows-2 gap-5">
          {CATEGORIES.map((category, index) => (
            <CategoryCard
              {...category}
              subcategories={category.subcategories?.map((sub) => sub.displayName)}
              key={index}
            />
          ))}
        </div>
        <AdvertList advertList={advertList} />
      </main>
    </>
  )
}
