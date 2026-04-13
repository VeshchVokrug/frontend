'use client'

import Image from 'next/image'
import { AdvertPhotos } from '../../model/schema'
import { useAdvertPhotoSlider } from '../../model/useAdvertPhotoSlider'

type Props = {
  photos: AdvertPhotos
}

export default function AdvertPhotoSlider({ photos }: Props) {
  const {
    previews,
    mainPhoto,
    isFirstPhoto,
    isLastPhoto,
    setPrevPhoto,
    setNextPhoto,
    setPhotoByIndex,
  } = useAdvertPhotoSlider(photos, 3)

  return (
    <section className="flex gap-2.5">
      <div className="flex flex-col items-center">
        <button
          className="bg-gray hover:bg-main disabled:hover:bg-gray flex h-7.5 w-27.5 items-center justify-center rounded-3xl transition disabled:opacity-50"
          onClick={setPrevPhoto}
          disabled={isFirstPhoto}
        >
          <Image
            src="/images/icons/arrow.svg"
            alt='Иконка кнопки слайдера "Назад"'
            className="rotate-90"
            width={5}
            height={20}
          />
        </button>
        {previews.map(({ id, img }) => (
          <button
            key={id}
            className={`relative flex h-41.5 w-31.5 items-center justify-center rounded-3xl`}
            onClick={() =>
              setPhotoByIndex(photos.findIndex((p) => p.id === id))
            }
          >
            <Image
              src={img}
              alt={`Изображение ${id}`}
              fill
              className="object-contain"
            />
          </button>
        ))}
        <button
          className="bg-gray hover:bg-main disabled:hover:bg-gray flex h-7.5 w-27.5 items-center justify-center rounded-3xl transition disabled:opacity-50"
          onClick={setNextPhoto}
          disabled={isLastPhoto}
        >
          <Image
            src="/images/icons/arrow.svg"
            alt='Иконка кнопки слайдера "Вперед"'
            className="rotate-270"
            width={5}
            height={20}
          />
        </button>
      </div>
      <div className="relative flex h-141.5 w-131.5 items-center justify-center rounded-3xl">
        <Image
          src={mainPhoto.img}
          alt={`Изображение ${mainPhoto.id}`}
          fill
          className="object-contain"
        />
      </div>
    </section>
  )
}
