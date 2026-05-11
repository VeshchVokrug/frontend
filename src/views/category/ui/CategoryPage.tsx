'use client'

import { CategoryCardProps } from '@/shared/ui/CategoryCard/type'

import AdvertList from '@/widgets/advert-list'
import CategoryFilter from '@/widgets/category-filter'
import Header from '@/widgets/header'

type CategoryPageProps = {
  categoryData: CategoryCardProps
  filterParams: {
    subcategory: string
    date: string
    priceMin: string
    priceMax: string
  }
}

const ADVERT_LIST = Array.from({ length: 6 }, (_, index) => ({
  id: String(index + 1),
  title: 'Название',
  category: 'electronics',
  image: '/images/logo.png',
  price: Math.floor(Math.random() * 5000),
}))

export default function CategoryPage({
  categoryData,
  filterParams,
}: CategoryPageProps) {
  return (
    <>
      <Header />
      <main className="flex w-full max-w-425 gap-15">
        <CategoryFilter
          categoryData={categoryData}
          filterParams={filterParams}
        />
        <div>
          <AdvertList advertList={ADVERT_LIST} gridCols={3} />
        </div>
      </main>
    </>
  )
}
