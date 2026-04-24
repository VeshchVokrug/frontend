import { CategoryCardProps } from '@/shared/ui/CategoryCard/type'

type SubcategoryListProps = {
  categoryData: CategoryCardProps
  subcategory: string
  onSelect: (name: string) => void
}

export default function SubcategoryFilter({
  categoryData,
  subcategory,
  onSelect,
}: SubcategoryListProps) {
  return (
    <div className="mb-10">
      <h2 className="mb-6 text-3xl font-medium">Категория</h2>
      <h3 className="mb-5.5 text-2xl">{categoryData.title}</h3>
      {categoryData.subcategories && (
        <ul className="flex flex-col gap-5">
          {categoryData.subcategories.map((name, index) => (
            <li
              key={index}
              className={`relative pl-7.5 ${
                subcategory &&
                subcategory.toLowerCase() === name.toLowerCase() &&
                'text-main before:border-main before:absolute before:top-1/2 before:left-0 before:h-3 before:w-3 before:-translate-y-1/2 before:rotate-45 before:border-t-2 before:border-r-2'
              }`}
            >
              <button
                className="hover:text-main text-left text-2xl transition"
                onClick={() => onSelect(name)}
                disabled={name === subcategory}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
