import { useDebounce } from '@/shared/lib/debounce'
import { useRouter, useSearchParams } from 'next/navigation'

export const useCategoryFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSubcategoryClick = (subcategory: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('subcategory', subcategory)
    router.push(`?${params.toString()}`)
  }

  const handlePriceChange = useDebounce((min: string, max: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (!min && !max) {
      params.delete('priceMin')
      params.delete('priceMax')
      router.push(`?${params.toString()}`)
      return
    }
    if (min) params.set('priceMin', min)
    if (max) params.set('priceMax', max)
    router.push(`?${params.toString()}`)
  }, 500)

  const handleDateChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('date', value)
    router.push(`?${params.toString()}`)
  }

  return { handleSubcategoryClick, handlePriceChange, handleDateChange }
}
