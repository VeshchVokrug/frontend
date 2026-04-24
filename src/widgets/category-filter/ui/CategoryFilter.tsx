import { CategoryCardProps } from '@/shared/ui/CategoryCard/type'

import SubcategoryFilter from './SubcategoryFilter'
import PriceFilter from './PriceFilter'
import DateFilter from './DateFilter'
import { useCategoryFilter } from '../model/use-category-filter'
import { DATE_OPTIONS } from '@/shared/constants/filter'

type CategoryFilterProps = {
  categoryData: CategoryCardProps
  filterParams: {
    subcategory: string
    date: string
    priceMin: string
    priceMax: string
  }
}

export default function CategoryFilter({
  categoryData,
  filterParams,
}: CategoryFilterProps) {
  const { handleSubcategoryClick, handlePriceChange, handleDateChange } =
    useCategoryFilter()

  return (
    <aside className="bg-gray h-fit w-full max-w-99 rounded-[20px] px-7 py-8.75">
      <SubcategoryFilter
        categoryData={categoryData}
        subcategory={filterParams.subcategory}
        onSelect={handleSubcategoryClick}
      />

      <PriceFilter
        minPrice={filterParams.priceMin}
        maxPrice={filterParams.priceMax}
        onChange={handlePriceChange}
      />
      <DateFilter
        dates={DATE_OPTIONS}
        date={filterParams.date}
        onChange={handleDateChange}
      />
    </aside>
  )
}
