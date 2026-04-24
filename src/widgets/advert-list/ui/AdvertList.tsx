'use client'

import { Advert, AdvertCard } from '@/entities/advert'
import Pagination from '@/shared/ui/Pagination'
import { useState } from 'react'

interface AdvertListProps {
  advertList: Advert[]
  gridCols?: number
}

const GRID: Record<number, string> = {
  3: 'grid-cols-3',
  4: 'grid-cols-4',
}

export default function AdvertList({
  advertList,
  gridCols = 4,
}: AdvertListProps) {
  const [page, setPage] = useState<number>(1)

  return (
    <section>
      <div
        className={`mb-5 grid justify-center gap-15.5 ${gridCols && GRID[gridCols]}`}
      >
        {advertList.map((advert) => (
          <AdvertCard {...advert} key={advert.id} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={12} setPage={setPage} />
    </section>
  )
}
