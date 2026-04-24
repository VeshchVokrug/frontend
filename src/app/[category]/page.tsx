import { notFound } from 'next/navigation'
import { CATEGORIES } from '@/shared/constants/categories'
import CategoryPage from '@/views/category'

export const dynamicParams: boolean = false

export function generateStaticParams() {
  return CATEGORIES.map(({ href }) => ({ category: href }))
}

type CategoryPageProps = {
  params: Promise<{ category: string }>
  searchParams: Promise<{
    subcategory: string
    date: string
    priceMin: string
    priceMax: string
  }>
}

export default async function page({
  params,
  searchParams,
}: CategoryPageProps) {
  const { category } = await params
  const filterParams = await searchParams
  const categoryData = CATEGORIES.find(({ href }) => href === category)

  if (!categoryData) {
    notFound()
  }

  return (
    <CategoryPage categoryData={categoryData} filterParams={filterParams} />
  )
}
