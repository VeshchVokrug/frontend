import Image from 'next/image'
import Link from 'next/link'
import { Advert } from '../../model/schema'

export default function AdvertCard({ title, image, price, id }: Advert) {
  return (
    <Link
      href={`/catalog/${id}`}
      className="bg-gray flex! h-142.5 w-full flex-col rounded-3xl"
    >
      <div className="flex h-full w-fit items-center justify-center rounded-t-3xl">
        {image && (
          <Image
            src={image}
            alt={title}
            width={375}
            height={472}
            className="cover"
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
    </Link>
  )
}
