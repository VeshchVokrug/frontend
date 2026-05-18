import AdvertList from '@/widgets/advert-list'

// TODO: заменить на данные из API
const ADVERT_LIST = Array.from({ length: 4 }, (_, index) => ({
  id: String(index + 1),
  title: 'Название',
  category: 'electronics',
  image: '/images/logo.png',
  price: Math.floor(Math.random() * 5000),
}))

export default function FavoritesPage() {
  return (
    <main>
      <h1 className="mb-8 text-[36px] font-bold">Избранное</h1>
      <AdvertList advertList={ADVERT_LIST} />
    </main>
  )
}
