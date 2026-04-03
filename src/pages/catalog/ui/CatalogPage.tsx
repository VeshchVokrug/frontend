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
          advertList={Array.from({ length: 8 }, (_, index) => ({
            id: String(index + 1),
            title: 'Название',
            category: 'electronics',
            image: '/images/logo.png',
            price: Math.floor(Math.random() * 5000),
          }))}
        />
      </main>
    </>
  )
}
