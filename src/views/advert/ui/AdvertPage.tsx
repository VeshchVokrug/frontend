'use client'

import { useMemo } from 'react'
import {
  AdvertHeader,
  AdvertOwnerInfo,
  AdvertPhotoSlider,
  AdvertСharacteristics,
  useAdvertDetails,
  useCreateOrder,
  type AvailabilitySlot,
} from '@/entities/advert'
import { useCurrentUser } from '@/entities/user/model/use-current-user'
import { Calendar } from '@/widgets/calendar'
import { toast } from 'sonner'
import { CATEGORIES } from '@/shared/constants/categories'

import Header from '@/widgets/header'

type Props = {
  id: string
}

export default function AdvertPage({ id }: Props) {
  const { data: advertDetails, isLoading, error } = useAdvertDetails(id)
  const { data: currentUser } = useCurrentUser()
  const { mutate: createOrder } = useCreateOrder()

  const photos = useMemo(() => {
    if (!advertDetails?.imagesUrls) return []
    return advertDetails.imagesUrls.map((url: string, idx: number) => ({
      id: idx + 1,
      img: url,
    }))
  }, [advertDetails])

  const unavailableDates = useMemo(() => {
    if (!advertDetails?.availabilitySlots) return {}

    const datesByMonth: Record<number, number[]> = {}
    const availableByMonth: Record<number, Set<number>> = {}
    const monthsInSlots = new Set<number>()

    advertDetails.availabilitySlots.forEach((slot: AvailabilitySlot) => {
      if (slot.dateDto) {
        const month = slot.dateDto.month - 1
        const day = slot.dateDto.day

        monthsInSlots.add(month)

        if (!availableByMonth[month]) {
          availableByMonth[month] = new Set()
        }

        if (slot.isAvailable) {
          availableByMonth[month].add(day)
        }
      }
    })

    const year = advertDetails.availabilitySlots?.[0]?.dateDto?.year || new Date().getFullYear()

    // For each month in the slots, mark all days as unavailable except those that are explicitly available
    Object.entries(availableByMonth).forEach(([monthStr, availableDays]) => {
      const month = parseInt(monthStr)
      const allDays = []
      const daysInMonth = new Date(year, month + 1, 0).getDate()

      for (let day = 1; day <= daysInMonth; day++) {
        if (!availableDays.has(day)) {
          allDays.push(day)
        }
      }

      datesByMonth[month] = allDays
    })

    // For months without any slots, mark all days as unavailable
    for (let month = 0; month < 12; month++) {
      if (!monthsInSlots.has(month) && !datesByMonth[month]) {
        const daysInMonth = new Date(year, month + 1, 0).getDate()
        const allDays = Array.from({ length: daysInMonth }, (_, i) => i + 1)
        datesByMonth[month] = allDays
      }
    }

    return datesByMonth
  }, [advertDetails])

  const handleSelectDates = (dates: string[]) => {
    if (!currentUser || !advertDetails) {
      toast.error('Войдите в аккаунт перед бронированием')
      return
    }

    if (dates.length < 2) {
      toast.error('Выберите диапазон дат')
      return
    }

    const startDate = new Date(dates[0])
    const endDate = new Date(dates[dates.length - 1])

    const startYear = startDate.getFullYear()
    const startMonth = startDate.getMonth() + 1
    const startDay = startDate.getDate()

    const endYear = endDate.getFullYear()
    const endMonth = endDate.getMonth() + 1
    const endDay = endDate.getDate()

    const daysCount =
      Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      ) + 1
    const expectedPrice = daysCount * advertDetails.defaultPrice

    const startDateStr = `${startYear}-${String(startMonth).padStart(2, '0')}-${String(startDay).padStart(2, '0')}`
    const endDateStr = `${endYear}-${String(endMonth).padStart(2, '0')}-${String(endDay).padStart(2, '0')}`

    toast(
      <div className="flex flex-col gap-3">
        <div className="text-[16px] font-semibold">
          Подтвердить бронирование?
        </div>
        <div className="text-[14px] text-gray-600">
          <p>
            Даты: {startDateStr} - {endDateStr}
          </p>
          <p>Количество дней: {daysCount}</p>
          <p className="font-semibold">Ожидаемая цена: {expectedPrice} ₽</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              createOrder({
                listingId: id,
                ownerId: advertDetails.ownerId,
                startDate: {
                  year: startYear,
                  month: startMonth,
                  day: startDay,
                },
                endDate: { year: endYear, month: endMonth, day: endDay },
                expectedPrice,
              })
              toast.dismiss()
            }}
            className="bg-main hover:bg-main-hover rounded px-4 py-2 text-[14px] font-semibold text-white"
          >
            Забронировать
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray rounded px-4 py-2 text-[14px] transition hover:bg-gray-300"
          >
            Отмена
          </button>
        </div>
      </div>,
      {
        duration: Infinity,
        position: 'top-center',
      }
    )
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="w-full max-w-425">
          <div>Загрузка...</div>
        </main>
      </>
    )
  }

  if (error || !advertDetails) {
    return (
      <>
        <Header />
        <main className="w-full max-w-425">
          <div>Ошибка при загрузке объявления</div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="w-full max-w-425">
        <div className="flex w-full gap-47.5">
          <div className="flex w-full flex-col gap-15">
            <AdvertPhotoSlider photos={photos} />
            <AdvertСharacteristics
              category={
                (() => {
                  const mainCat = CATEGORIES.find((cat) => cat.slug === advertDetails.categorySlug)
                  if (mainCat) return mainCat.title

                  const parentCat = CATEGORIES.find((cat) =>
                    cat.subcategories?.some((sub) => sub.value === advertDetails.categorySlug)
                  )
                  const subCat = parentCat?.subcategories?.find((sub) => sub.value === advertDetails.categorySlug)

                  if (parentCat && subCat) {
                    return `${parentCat.title} - ${subCat.displayName}`
                  }

                  return advertDetails.categorySlug
                })()
              }
              description={advertDetails.description}
            />
          </div>
          <div className="flex w-full flex-col gap-15">
            <AdvertHeader
              title={advertDetails.title}
              price={advertDetails.defaultPrice}
            />
            <Calendar
              unavailableDates={unavailableDates}
              singleRange={true}
              onSelect={handleSelectDates}
              showToast={false}
              autoReset={true}
            />
            <AdvertOwnerInfo
              name={advertDetails.ownerName}
              status="Частное лицо"
              rating={advertDetails.ownerRating}
              reviewsCount={0}
              ownerId={advertDetails.ownerId}
              ownerPhone={advertDetails.ownerPhone}
            />
          </div>
        </div>
      </main>
    </>
  )
}
