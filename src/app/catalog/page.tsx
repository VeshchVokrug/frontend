import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { prefetchRentals } from '@/entities/advert/api/prefetch-rentals'
import CategoryPage from '@/views/category'
import { resolveDate } from '@/shared/lib/date'

type CatalogPageProps = {
  searchParams: Promise<{
    categorySlug?: string
    date?: string
    priceMin?: string
    priceMax?: string
  }>
}

export default async function page({ searchParams }: CatalogPageProps) {
  const filterParams = await searchParams

  const endDate = filterParams.date ? resolveDate(filterParams.date) : null
  const endYear = endDate ? endDate.getFullYear() : undefined
  const endMonth = endDate ? endDate.getMonth() + 1 : undefined
  const endDay = endDate ? endDate.getDate() : undefined

  const serverQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
      },
    },
  })

  try {
    await prefetchRentals(serverQueryClient, {
      pageNumber: 1,
      pageSize: 12,
      categorySlug: filterParams.categorySlug,
      minPrice: filterParams.priceMin
        ? Number(filterParams.priceMin)
        : undefined,
      maxPrice: filterParams.priceMax
        ? Number(filterParams.priceMax)
        : undefined,
      'endDate.year': endYear,
      'endDate.month': endMonth,
      'endDate.day': endDay,
    })
  } catch (error) {
    console.error('Failed to prefetch rentals:', error)
  }

  const dehydratedState = dehydrate(serverQueryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <CategoryPage filterParams={filterParams} />
    </HydrationBoundary>
  )
}
