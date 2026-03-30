import CategoryCard from '@/shared/ui/CategoryCard'
import { CATALOG_CATEGORIES } from '../data/categories'
import Header from '@/widgets/header'
import AdvertList from '@/widgets/advert-list'

export default function CatalogPage() {
  return (
    <>
      <Header />
      <main className="w-425">
        <div className="mb-20 grid h-75 grid-cols-32 grid-rows-2 gap-5">
          {CATALOG_CATEGORIES.map((category, index) => (
            <CategoryCard {...category} key={index} />
          ))}
        </div>
        <AdvertList
          advertList={Array.from({ length: 18 }).fill({
            id: 1,
            title: 'название',
            category: 'electronics',
            image: '/images/logo.png',
            price: 1500,
          })}
        />
      </main>
    </>
  )
}
