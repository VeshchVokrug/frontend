import { CategoryCardProps } from '@/shared/ui/CategoryCard/type'
import { Subcategory } from '@/shared/constants/categories'

type SubcategoryListProps = {
  categoryData: CategoryCardProps
  subcategory: string
  subcategoryData?: Subcategory[]
  onSelect: (name: string) => void
}

export default function SubcategoryFilter({
  categoryData,
  subcategory,
  subcategoryData,
  onSelect,
}: SubcategoryListProps) {
  return (
    <div className="mb-10">
      <h2 className="mb-6 text-3xl font-medium">Категория</h2>
      <h3 className="mb-5.5 text-2xl">{categoryData.title}</h3>
      {categoryData.subcategories && (
        <ul className="flex flex-col gap-5">
          {categoryData.subcategories.map((name, index) => {
            const subValue = subcategoryData?.find((s) => s.displayName === name)?.value
            const isActive = subValue && subcategory === subValue
            return (
              <li
                key={index}
                className={`relative pl-7.5 ${
                  isActive &&
                  'text-main before:border-main before:absolute before:top-1/2 before:left-0 before:h-3 before:w-3 before:-translate-y-1/2 before:rotate-45 before:border-t-2 before:border-r-2'
                }`}
              >
                <button
                  className="hover:text-main-hover active:text-main-active text-left text-2xl transition"
                  onClick={() => onSelect(name)}
                  disabled={isActive || false}
                >
                  {name}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
