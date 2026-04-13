import {
  AdvertCalendar,
  AdvertHeader,
  AdvertOwnerInfo,
  AdvertPhotoSlider,
  AdvertСharacteristics,
} from '@/entities/advert'
import Header from '@/widgets/header'

type Props = {
  category: string
  id: string
}

// TODO: заменить на получение данных из API
const photos = [
  {
    id: 1,
    img: '/images/logo.png',
  },
  {
    id: 2,
    img: '/images/categories/electronics.svg',
  },
  {
    id: 3,
    img: '/images/categories/clothes.svg',
  },
  {
    id: 4,
    img: '/images/categories/events.svg',
  },
  {
    id: 5,
    img: '/images/categories/hobbies.svg',
  },
  {
    id: 6,
    img: '/images/categories/sport.svg',
  },
]

export default function AdvertPage({ category, id }: Props) {
  return (
    <>
      <Header />
      <main className="w-full max-w-425">
        <div className="flex w-full gap-47.5">
          <div className="flex w-fit flex-col gap-15">
            <AdvertPhotoSlider photos={photos} />
            <AdvertСharacteristics
              category="строительные инструменты и техника"
              description="дрель аккумуляторная мощная"
            />
          </div>
          <div className="flex w-full flex-col gap-15">
            <AdvertHeader title="Дрель аккумуляторная" price={1500} />
            <AdvertCalendar />
            <AdvertOwnerInfo
              name="Пользователь"
              status="Частное лицо"
              rating={4.9}
              reviewsCount={13}
            />
          </div>
        </div>
      </main>
    </>
  )
}
