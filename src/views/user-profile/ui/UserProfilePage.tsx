import { UserInfo } from '@/entities/user'
import { User } from '@/entities/user/model/schema'
import AdvertList from '@/widgets/advert-list'

// TODO:Заменить на данные из API
const THING_COUNT = 3
const RENT_COUNT = 3
const THINGS = Array.from({ length: 3 }, (_, index) => ({
  id: String(index + 1),
  title: 'Название',
  category: 'electronics',
  image: '/images/logo.png',
  price: Math.floor(Math.random() * 5000),
}))

export default function UserProfilePage({ user }: { user: User }) {
  return (
    <main className="mx-auto flex w-full max-w-425 gap-16.75 pb-10">
      <div className="flex max-w-100.5 flex-col gap-7.5">
        <UserInfo
          user={user}
          isVertical
          showReportButton
          imageSize={100}
          isCurrentUserProfile={false}
        />

        <section className="bg-gray shadow-shadow relative flex-2 rounded-[30px] p-8.5 shadow-md/40">
          <div className="flex flex-col gap-5">
            <p className="text-[30px] font-bold">
              Сдач в аренду: <span className="font-normal">{RENT_COUNT}</span>
            </p>
            <p className="text-[30px] font-bold">
              Количество вещей:{' '}
              <span className="font-normal">{THING_COUNT}</span>
            </p>
          </div>
        </section>

        <section className="flex flex-col items-center gap-5">
          <button className="bg-main hover:bg-main-hover shadow-shadow active:bg-main-active w-full max-w-83.25 rounded-[30px] py-3.25 text-[30px]/[36px] font-bold text-white shadow-md/30 transition">
            Написать
          </button>
          <button className="bg-gray shadow-shadow w-full max-w-83.25 rounded-[30px] py-3.25 text-[30px]/[36px] font-bold shadow-md/30">
            Позвонить
          </button>
        </section>
      </div>

      <section className="flex flex-col gap-3.5">
        <h2 className="text-[36px] font-bold">Вещи пользователя</h2>
        {THINGS ? (
          <AdvertList advertList={THINGS} gridCols={3} />
        ) : (
          <p className="text-[30px]">
            В данный момент этот пользователь не сдает вещи в аренду
          </p>
        )}
      </section>
    </main>
  )
}
