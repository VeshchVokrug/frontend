import {
  AdvertOwnerInfo,
  AdvertPhotoSlider,
  AdvertСharacteristics,
} from '@/entities/advert'
import { ShareCard } from '@/entities/coownership'
import Header from '@/widgets/header'

type Props = {
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

const THING_DATA = {
  title: 'Дрель аккумуляторная',
  price: 1500,
}

const SHARE_DATA = {
  available: 2,
  price: 1000,
  endDate: new Date(),
}

export default function CoownershipPage({ id }: Props) {
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
            <section className="mt-7.5">
              <h1 className="mb-9.5 text-[40px] font-bold">
                {THING_DATA.title}
              </h1>
              <p className="text-[34px]">
                Общая стоимость вещи:{' '}
                <span className="text-[40px] font-bold">
                  {THING_DATA.price}₽
                </span>
              </p>
            </section>
            <ShareCard {...SHARE_DATA} />
            <AdvertOwnerInfo
              name="Пользователь"
              status="Частное лицо"
              rating={4.9}
              reviewsCount={13}
              showContactButton={false}
            />
          </div>
        </div>
      </main>
    </>
  )
}
