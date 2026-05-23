import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { prefetchRentalDetails } from '@/entities/advert/api/prefetch-rental-details'
import AdvertPage from '@/views/advert'

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const serverQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
      },
    },
  })

  try {
    await prefetchRentalDetails(serverQueryClient, id)
  } catch (error) {
    console.error('Failed to prefetch rental details:', error)
  }

  const dehydratedState = dehydrate(serverQueryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <AdvertPage id={id} />
    </HydrationBoundary>
  )
}
