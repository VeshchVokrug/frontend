import Image from 'next/image'
import { getPageRange } from './pagination.utils'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  currentPage: number
  totalPages: number
  setPage: Dispatch<SetStateAction<number>>
}

export default function Pagination({
  currentPage,
  totalPages,
  setPage,
}: Props) {
  const pageRange = getPageRange(currentPage, totalPages)

  return (
    <div className="flex justify-center gap-5">
      <button
        className="bg-gray flex h-12.5 w-12.5 items-center justify-center rounded-full hover:opacity-80 disabled:opacity-50"
        onClick={() => setPage((prev) => (prev <= 1 ? 1 : prev - 1))}
        disabled={currentPage <= 1}
      >
        <Image
          src="/images/icons/arrow.svg"
          alt='Иконка кнопки "Назад"'
          width={5}
          height={10}
        />
      </button>

      <div className="bg-gray relative z-10 flex gap-5 rounded-4xl px-6 py-3">
        {pageRange.map((page, index) => (
          <button
            key={index}
            className={`after:bg-main text-secondary relative after:absolute after:-top-3 after:right-1/2 after:-z-10 after:h-13 after:w-10.5 after:translate-x-1/2 after:rounded-2xl after:content-[''] ${page === currentPage ? 'text-white after:block' : 'after:hidden'}`}
            onClick={() => setPage((prev) => (page !== '...' ? page : prev))}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className="bg-gray flex h-12.5 w-12.5 items-center justify-center rounded-full hover:opacity-80 disabled:opacity-50"
        onClick={() =>
          setPage((prev) => (prev >= totalPages ? totalPages : prev + 1))
        }
        disabled={currentPage >= totalPages}
      >
        <Image
          src="/images/icons/arrow.svg"
          alt='Иконка кнопки "Вперед"'
          width={5}
          height={10}
          className="rotate-180"
        />
      </button>
    </div>
  )
}
