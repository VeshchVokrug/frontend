'use client'

import { Advert, AdvertCard } from '@/entities/advert'
import Pagination from '@/shared/ui/Pagination'

interface AdvertListProps {
  advertList: Advert[]
  gridCols?: number
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
  onDelete?: (id: string) => Promise<void>
  showDeleteButton?: boolean
}

const GRID: Record<number, string> = {
  3: 'grid-cols-3',
  4: 'grid-cols-4',
}

export default function AdvertList({
  advertList,
  gridCols = 4,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onDelete,
  showDeleteButton = false,
}: AdvertListProps) {
  return (
    <section className="w-full">
      <div
        className={`mb-5 grid w-full justify-center gap-15.5 ${gridCols && GRID[gridCols]}`}
      >
        {advertList?.map((advert) => (
          <AdvertCard
            {...advert}
            key={advert.id}
            onDelete={onDelete}
            showDeleteButton={showDeleteButton}
          />
        ))}
      </div>
      {advertList?.length > 6 && onPageChange && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setPage={onPageChange}
        />
      )}
    </section>
  )
}
