'use client'

import { useMemo, useState } from 'react'
import { CATEGORIES } from '@/shared/constants/categories'
import { resolveDate } from '@/shared/lib/date'
import { useRentals } from '@/entities/advert'
import AdvertList from '@/widgets/advert-list'
import CategoryFilter from '@/widgets/category-filter'
import Header from '@/widgets/header'

type CategoryPageProps = {
  filterParams: {
    categorySlug?: string
    subcategory?: string
    date?: string
    priceMin?: string
    priceMax?: string
  }
}

export default function CategoryPage({ filterParams }: CategoryPageProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const categorySlug = filterParams.categorySlug || 'electronics'
  const categoryData = CATEGORIES.find(({ slug }) => slug === categorySlug)!

  const queryParams = useMemo(() => {
    const params: Record<string, string | number | undefined> = {
      pageNumber: currentPage,
      pageSize: 9,
    }

    if (filterParams.categorySlug) {
      params.categorySlug = filterParams.categorySlug
    }
    if (filterParams.subcategory) {
      params.subcategory = filterParams.subcategory
    }
    if (filterParams.priceMin) {
      params.minPrice = Number(filterParams.priceMin)
    }
    if (filterParams.priceMax) {
      params.maxPrice = Number(filterParams.priceMax)
    }
    if (filterParams.date) {
      const endDate = resolveDate(filterParams.date)
      if (endDate) {
        params['endDate.year'] = endDate.getFullYear()
        params['endDate.month'] = endDate.getMonth() + 1
        params['endDate.day'] = endDate.getDate()
      }
    }

    return params
  }, [filterParams, currentPage])

  const { data, isLoading, error } = useRentals(queryParams)

  const advertList = useMemo(() => {
    if (!data?.items) return []
    return data.items.map((item) => ({
      id: item.listingId,
      title: item.title,
      category: 'electronics',
      image: item.imageUrl ?? '',
      price: item.pricePerDay,
      rating: item.ownerRating,
    }))
  }, [data])

  return (
    <>
      <Header />
      <main className="flex w-full max-w-425 gap-15">
        <CategoryFilter
          categoryData={categoryData}
          filterParams={filterParams}
        />
        <div className="w-full">
          {isLoading && <div>Загрузка...</div>}
          {error && <div>Ошибка при загрузке данных</div>}
          {advertList.length > 0 && (
            <AdvertList
              advertList={advertList}
              gridCols={3}
              currentPage={currentPage}
              totalPages={
                data?.totalCount ? Math.ceil(data.totalCount / 12) : 1
              }
              onPageChange={setCurrentPage}
            />
          )}
          {!isLoading && advertList.length === 0 && !error && (
            <div>Объявлений не найдено</div>
          )}
        </div>
      </main>
    </>
  )
}
