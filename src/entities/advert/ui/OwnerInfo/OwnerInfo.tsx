import Image from 'next/image'

type Props = {
  name: string
  status: string
  rating: number
  reviewsCount: number
}

export default function OwnerInfo({
  name,
  status,
  rating,
  reviewsCount,
}: Props) {
  return (
    <section className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-8.75">
          <p className="relative text-[34px] font-bold after:absolute after:top-1/2 after:-right-5 after:h-1.75 after:w-1.75 after:rounded-full after:bg-black">
            {name}
          </p>
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

      <button className="bg-dark-gray h-fit rounded-4xl px-7.5 py-5 text-[30px]/[1.2] font-bold text-white transition hover:opacity-80">
        Написать
      </button>
    </section>
  )
}
