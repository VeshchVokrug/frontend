'use client'

import { UserInfo } from '@/entities/user'
import { User } from '@/entities/user/model/schema'
import LogoutButton from '@/features/logout/ui/LogoutButton'
import {
  CATEGORIES_PLURAL_FORMS,
  FAVORITES_THINGS_PLURAL_FORMS,
} from '@/shared/constants/profile'
import { formatDateRange } from '@/shared/lib/format-date-range'
import { usePlural } from '@/shared/lib/pluralize'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// TODO: Заменить на получение данных из API
const ORDERS: { name: string; dateStart: Date; dateEnd: Date }[] = [
  {
    name: 'Велосипед',
    dateStart: new Date(2026, 4, 4),
    dateEnd: new Date(2026, 4, 10),
  },
  {
    name: 'Дрель',
    dateStart: new Date(2026, 3, 29),
    dateEnd: new Date(2026, 4, 7),
  },
]

const FAVORITES_THING_COUNT = 15

export default function ProfilePage({ user }: { user: User }) {
  const pathname = usePathname()
  const categoriesLabel = usePlural(
    user?.favoriteCategories?.length || 0,
    CATEGORIES_PLURAL_FORMS
  )

  const favoritesThingsLabel = usePlural(
    FAVORITES_THING_COUNT || 0,
    FAVORITES_THINGS_PLURAL_FORMS
  )

  return (
    <main className="mx-auto flex w-full max-w-425 flex-col gap-10 pb-10">
      <div className="flex gap-10.5">
        <UserInfo user={user} />
        <section className="bg-main shadow-shadow flex-1 flex-col gap-6 rounded-[30px] px-10 py-11.25 text-white shadow-md/40">
          <h2 className="mb-14.25 text-[36px] font-bold">Сдать в аренду</h2>
          <div>
            <Link
              href={`${pathname}/adverts/create`}
              className="hover:text-main-hover active:text-main-active text-[30px] transition"
            >
              Стать владельцем
            </Link>

            <Link
              href="/coownership"
              className="hover:text-main-hover active:text-main-active text-[30px] transition"
            >
              Стать совладельцем
            </Link>

            <Link
              href={`${pathname}/adverts`}
              className="hover:text-main-hover active:text-main-active text-[30px] transition"
            >
              Мои вещи
            </Link>
          </div>
        </section>
      </div>

      <div className="flex gap-7.75">
        <Link
          href={`${pathname}/orders`}
          className="bg-gray shadow-shadow flex-1 flex-col gap-6 rounded-[30px] px-11 py-10.5 shadow-md/40"
        >
          <h2 className="mb-7 text-[36px] font-bold">Актуальные заказы</h2>
          {ORDERS.length ? (
            <div className="flex flex-col gap-5">
              {ORDERS.map(({ dateStart, dateEnd }) => (
                <div key={dateStart.toISOString()} className="flex gap-5">
                  <p className="text-[30px]">Аренда: </p>
                  <p className="text-[30px]">
                    {formatDateRange(dateStart, dateEnd)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[30px]">Нет актуальных заявок</p>
          )}
        </Link>

        <Link
          href={`${pathname}/orders/previous`}
          className="bg-gray shadow-shadow flex-1 flex-col gap-6 rounded-[30px] px-11 py-10.5 shadow-md/40"
        >
          <h2 className="mb-7 text-[36px] font-bold">Предыдущие заказы</h2>

          <p className="text-[30px]">Посмотрите, что вы уже брали в аренду</p>
        </Link>
      </div>

      <div className="flex gap-7.75">
        <Link
          href={`${pathname}/orders`}
          className="bg-gray shadow-shadow flex-1 flex-col gap-6 rounded-[30px] px-11 py-10.5 shadow-md/40"
        >
          <h2 className="mb-7 text-[36px] font-bold">Любимые категории</h2>
          {user?.favoriteCategories?.length ? (
            <p>
              {user.favoriteCategories.length} {categoriesLabel}
            </p>
          ) : (
            <p className="text-[30px]">У вас нет любимых категорий</p>
          )}
        </Link>

        <Link
          href={`${pathname}/favorites`}
          className="bg-gray shadow-shadow flex-1 flex-col gap-6 rounded-[30px] px-11 py-10.5 shadow-md/40"
        >
          <h2 className="mb-7 text-[36px] font-bold">Избранное</h2>

          {FAVORITES_THING_COUNT ? (
            <p className="text-[30px]">
              {FAVORITES_THING_COUNT} {favoritesThingsLabel}
            </p>
          ) : (
            <p className="text-[30px]">У вас нет вещей в избранном</p>
          )}
        </Link>
      </div>

      <div className="mt-9.5 flex w-full justify-end">
        <LogoutButton />
      </div>
    </main>
  )
}
