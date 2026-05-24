'use client'

import { useMemo } from 'react'
import { UserInfo } from '@/entities/user'
import { User } from '@/entities/user/model/schema'
import { useUserAdverts } from '@/entities/advert'
import { tokenStorage } from '@/shared/lib/tokens'
import AdvertList from '@/widgets/advert-list'

export default function UserProfilePage({ user }: { user: User }) {
  const isAuthorized = !!tokenStorage.getAccessToken()
  const { data: adverts, isLoading, error } = useUserAdverts(user?.id)

  const advertList = useMemo(() => {
    if (!adverts?.items) return []
    return adverts.items.map((item) => ({
      id: item.listingId,
      title: item.title,
      category: 'general',
      image: item.imageUrl ?? '',
      price: item.pricePerDay,
    }))
  }, [adverts])

  if (!isAuthorized) {
    return (
      <main className="mx-auto flex w-full max-w-425 gap-16.75 pb-10">
        <div className="flex h-fit max-w-100.5 flex-col gap-7.5">
          <UserInfo
            user={user}
            isVertical
            showReportButton
            imageSize={100}
            isCurrentUserProfile={false}
          />
        </div>
        <section className="flex flex-col gap-3.5">
          <div>
            Вы должны авторизоваться, чтобы посмотреть вещи пользователя
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="mx-auto flex w-full max-w-425 gap-16.75 pb-10">
      <div className="flex h-fit max-w-100.5 flex-col gap-7.5">
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
              Вещей в аренду:{' '}
              <span className="font-normal">{adverts?.items?.length || 0}</span>
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
        {isLoading && <div>Загрузка...</div>}
        {error && <div>Ошибка при загрузке вещей</div>}
        {advertList.length > 0 ? (
          <AdvertList advertList={advertList} gridCols={3} />
        ) : (
          !isLoading && (
            <p className="text-[30px]">
              В данный момент этот пользователь не сдает вещи в аренду
            </p>
          )
        )}
      </section>
    </main>
  )
}
