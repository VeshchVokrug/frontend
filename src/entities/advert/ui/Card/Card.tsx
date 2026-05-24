'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Advert } from '../../model/schema'
import { toast } from 'sonner'

type AdvertCardProps = Advert & {
  onDelete?: (id: string) => Promise<void>
  showDeleteButton?: boolean
}

export default function AdvertCard({
  title,
  image,
  price,
  id,
  onDelete,
  showDeleteButton = false,
}: AdvertCardProps) {
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    toast(
      <div className="flex flex-col gap-3">
        <div className="text-[16px] font-semibold">Удалить объявление?</div>
        <div className="text-[14px]">
          Вы уверены, что хотите удалить &quot;{title}&quot;? Это действие
          нельзя отменить.
        </div>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              try {
                if (onDelete) {
                  await onDelete(id)
                }
                toast.dismiss()
              } catch (error) {
                console.error('Ошибка удаления объявления:', error)
              }
            }}
            className="bg-red rounded px-4 py-2 text-[14px] font-semibold text-white hover:bg-red-400 active:bg-red-600"
          >
            Удалить
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

  return (
    <Link
      href={`/catalog/${id}`}
      className="bg-gray relative flex! h-142.5 w-full flex-col rounded-3xl"
    >
      <div className="flex h-full w-fit items-center justify-center rounded-t-3xl">
        {image && (
          <Image
            src={image}
            alt={title}
            width={375}
            height={472}
            className="cover"
            unoptimized
          />
        )}
      </div>
      <div className="p-5 pt-2">
        <p className="text-main mb-0.5 text-3xl font-medium">
          {price}
          <span> ₽</span>
        </p>
        <h2 className="text-2xl">{title}</h2>
      </div>

      {showDeleteButton && onDelete && (
        <button
          onClick={handleDelete}
          className="bg-red absolute top-2 right-2 rounded-2xl p-2 text-white shadow-md transition hover:bg-red-400 active:bg-red-600"
          title="Удалить объявление"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14" />
          </svg>
        </button>
      )}
    </Link>
  )
}
