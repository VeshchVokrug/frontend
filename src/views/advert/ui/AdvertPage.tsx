'use client'

import { useMemo } from 'react'
import {
  AdvertHeader,
  AdvertOwnerInfo,
  AdvertPhotoSlider,
  AdvertСharacteristics,
  useRentalDetails,
  useCreateBooking,
  type AvailabilitySlot,
} from '@/entities/advert'
import { useCurrentUser } from '@/entities/user/model/use-current-user'
import { Calendar } from '@/widgets/calendar'
import { toast } from 'sonner'

import Header from '@/widgets/header'

type Props = {
  id: string
}

export default function AdvertPage({ id }: Props) {
  const { data: rentalDetails, isLoading, error } = useRentalDetails(id)
  const { data: currentUser } = useCurrentUser()
  const { mutate: createBooking } = useCreateBooking()

  const photos = useMemo(() => {
    if (!rentalDetails?.imagesUrls) return []
    return rentalDetails.imagesUrls.map((url: string, idx: number) => ({
      id: idx + 1,
      img: url,
    }))
  }, [rentalDetails])

  const unavailableDates = useMemo(() => {
    if (!rentalDetails?.availabilitySlots) return {}

    const datesByMonth: Record<number, number[]> = {}

    rentalDetails.availabilitySlots.forEach((slot: AvailabilitySlot) => {
      if (!slot.isAvailable && slot.date) {
        const month = slot.date.month - 1
        const day = slot.date.day

        if (!datesByMonth[month]) {
          datesByMonth[month] = []
        }
        datesByMonth[month].push(day)
      }
    })

    return datesByMonth
  }, [rentalDetails])

  const handleSelectDates = (dates: string[]) => {
    if (!currentUser || !rentalDetails) {
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

    const daysCount = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
    const expectedPrice = daysCount * rentalDetails.defaultPrice

    const startDateStr = `${startYear}-${String(startMonth).padStart(2, '0')}-${String(startDay).padStart(2, '0')}`
    const endDateStr = `${endYear}-${String(endMonth).padStart(2, '0')}-${String(endDay).padStart(2, '0')}`

    toast(
      <div className="flex flex-col gap-3">
        <div className="text-[16px] font-semibold">Подтвердить бронирование?</div>
        <div className="text-[14px] text-gray-600">
          <p>Даты: {startDateStr} - {endDateStr}</p>
          <p>Количество дней: {daysCount}</p>
          <p className="font-semibold">Ожидаемая цена: {expectedPrice} ₽</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              createBooking({
                listingId: id,
                ownerId: rentalDetails.ownerId,
                startDate: { year: startYear, month: startMonth, day: startDay },
                endDate: { year: endYear, month: endMonth, day: endDay },
                expectedPrice,
              })
              toast.dismiss()
            }}
            className="bg-main hover:bg-main-hover px-4 py-2 rounded text-white text-[14px] font-semibold"
          >
            Забронировать
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray px-4 py-2 rounded text-[14px]"
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

  if (error || !rentalDetails) {
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
              category={rentalDetails.categorySlug}
              description={rentalDetails.description}
            />
          </div>
          <div className="flex w-full flex-col gap-15">
            <AdvertHeader
              title={rentalDetails.title}
              price={rentalDetails.defaultPrice}
            />
            <Calendar
              unavailableDates={unavailableDates}
              singleRange={true}
              onSelect={handleSelectDates}
              showToast={false}
              autoReset={true}
            />
            <AdvertOwnerInfo
              name={rentalDetails.ownerName}
              status="Частное лицо"
              rating={rentalDetails.ownerRating}
              reviewsCount={0}
            />
          </div>
        </div>
      </main>
    </>
  )
}
