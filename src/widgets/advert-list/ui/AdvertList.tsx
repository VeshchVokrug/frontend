import { Advert } from '@/entities/advert/model/schema'
import AdvertCard from '@/entities/advert/ui/AdvertCard/AdvertCard'

export default function AdvertList({ advertList }: { advertList: Advert[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-5">
      {advertList.map((advert, index) => (
        <AdvertCard {...advert} key={index} />
      ))}
    </div>
  )
}
