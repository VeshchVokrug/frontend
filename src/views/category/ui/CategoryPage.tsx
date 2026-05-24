'use client'

import { useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { resolveDate } from '@/shared/lib/date'
import { useAdverts } from '@/entities/advert'
import { CATEGORIES } from '@/shared/constants/categories'
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
  const router = useRouter()
  const searchParams = useSearchParams()
  const categorySlug = filterParams.categorySlug || 'construction'

  const categoryData = useMemo(() => {
    return CATEGORIES.find(({ slug }) => slug === categorySlug) ?? null
  }, [categorySlug])

  const defaultSubcategory = useMemo(() => {
    return categoryData?.subcategories?.[0]?.value
  }, [categoryData])

  const subcategoryMap = useMemo(() => {
    if (!categoryData?.subcategories) return new Map()
    return new Map(
      categoryData.subcategories.map((sub) => [sub.displayName, sub.value])
    )
  }, [categoryData])

  const effectiveSubcategory = useMemo(() => {
    return filterParams.subcategory || defaultSubcategory || ''
  }, [filterParams.subcategory, defaultSubcategory])

  const handleSubcategorySelect = (displayName: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (displayName === '') {
      params.delete('subcategory')
    } else {
      const value = subcategoryMap.get(displayName)
      if (!value) return
      params.set('subcategory', value)
    }

    router.push(`?${params.toString()}`)
  }

  const queryParams = useMemo(() => {
    const params: Record<string, string | number | undefined> = {
      pageNumber: currentPage,
      pageSize: 9,
    }

    params.categorySlug = effectiveSubcategory
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
  }, [effectiveSubcategory, filterParams, currentPage])

  const { data, isLoading, error } = useAdverts(queryParams)

  const advertList = useMemo(() => {
    if (!data?.items) return []
    return data.items.map((item) => ({
      id: item.listingId,
      title: item.title,
      category: 'electronics',
      image: item.imageUrl ?? '/images/logo.png',
      price: item.pricePerDay,
      rating: item.ownerRating,
    }))
  }, [data])

  if (!categoryData) {
    return (
      <>
        <Header />
        <main className="w-full max-w-425">
          <div>Категория не найдена</div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="flex w-full max-w-425 gap-15">
        {categoryData && (
          <CategoryFilter
            categoryData={{
              ...categoryData,
              subcategories: categoryData.subcategories?.map((sub) => sub.displayName),
            }}
            filterParams={{ ...filterParams, subcategory: effectiveSubcategory }}
            onSubcategorySelect={handleSubcategorySelect}
            subcategoryData={categoryData.subcategories}
          />
        )}
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
