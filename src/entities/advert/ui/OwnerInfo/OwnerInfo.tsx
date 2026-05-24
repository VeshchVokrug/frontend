'use client'

import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'

type Props = {
  name: string
  status: string
  rating: number
  reviewsCount: number
  ownerId?: string
  ownerPhone?: string
  showContactButton?: boolean
}

export default function OwnerInfo({
  name,
  status,
  rating,
  reviewsCount,
  ownerId,
  ownerPhone,
  showContactButton = true,
}: Props) {
  const handleContactClick = () => {
    if (!ownerPhone) {
      toast.error('Номер телефона недоступен')
      return
    }

    const dismiss = () => toast.dismiss(toastId)

    const toastId = toast(
      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold">Контактный номер:</p>
          <button
            onClick={dismiss}
            className="flex h-6 w-6 shrink-0 items-center justify-center text-lg font-bold text-gray-400 transition hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        <p className="text-center text-[18px] font-bold">{ownerPhone}</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              navigator.clipboard.writeText(ownerPhone)
              toast.success('Номер скопирован в буфер обмена')
            }}
            className="bg-main hover:bg-main-hover flex-1 rounded-2xl px-4 py-2 text-[14px] font-semibold text-white transition"
          >
            Скопировать
          </button>
          <button
            onClick={dismiss}
            className="bg-gray flex-1 rounded-2xl px-4 py-2 text-[14px] font-semibold transition hover:bg-gray-200"
          >
            Отмена
          </button>
        </div>
      </div>,
      {
        duration: Infinity,
        position: 'top-center',
        unstyled: true,
        classNames: {
          toast: 'bg-white rounded-3xl p-4 shadow-lg w-[320px]',
        },
      }
    )
  }

  return (
    <section className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-8.75">
          {ownerId ? (
            <Link
              href={`/user/${ownerId}`}
              className="relative text-[34px] font-bold transition after:absolute after:top-1/2 after:-right-5 after:h-1.75 after:w-1.75 after:rounded-full after:bg-black hover:opacity-70"
            >
              {name}
            </Link>
          ) : (
            <p className="relative text-[34px] font-bold after:absolute after:top-1/2 after:-right-5 after:h-1.75 after:w-1.75 after:rounded-full after:bg-black">
              {name}
            </p>
          )}
          <p className="text-3xl">{status}</p>
        </div>
        <div className="flex gap-3.5">
          <div className="flex gap-0.75">
            <Image
              src="/images/icons/star.svg"
              alt="Иконка рейтинга"
              width={30}
              height={30}
            />
            <span className="text-main text-[26px] font-bold">{rating}</span>
          </div>
          <p className="text-[26px]">
            <span>{reviewsCount}</span> отзывов
          </p>
        </div>
      </div>

      {showContactButton && (
        <button
          onClick={handleContactClick}
          className="bg-main disabled:bg-disabled hover:bg-main-hover active:bg-main-active h-fit rounded-4xl px-7.5 py-5 text-[30px]/[1.2] font-bold text-white transition hover:opacity-80"
        >
          Связаться
        </button>
      )}
    </section>
  )
}
