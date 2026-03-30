import Image from 'next/image'
import Link from 'next/link'
import { Advert } from '../../model/schema'

export default function AdvertCard({
  title,
  image,
  price,
  id,
  category,
}: Advert) {
  return (
    <Link
      href={`${category}/${id}`}
      className="bg-gray flex! h-85 w-62.5 flex-col rounded-3xl"
    >
      <div className="flex h-65 w-62.5 items-center justify-center rounded-t-3xl">
        <Image
          src={image}
          alt={title}
          width={250}
          height={260}
          className="cover"
        />
      </div>
      <div className="p-2">
        <p className="text-2xl">
          <span className="text-main">{price} </span>
          руб/сут
        </p>
        <h2>{title}</h2>
      </div>
    </Link>
  )
}
