'use client'

import { Advert, AdvertCard } from '@/entities/advert'
import Pagination from '@/shared/ui/Pagination'
import { useState } from 'react'

export default function AdvertList({ advertList }: { advertList: Advert[] }) {
  const [page, setPage] = useState<number>(1)

  return (
    <section>
      <div className="mb-5 flex flex-wrap justify-center gap-15.5">
        {advertList.map((advert) => (
          <AdvertCard {...advert} key={advert.id} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={12} setPage={setPage} />
    </section>
  )
}
