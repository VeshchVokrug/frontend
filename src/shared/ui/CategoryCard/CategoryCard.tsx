import Link from 'next/link'
import clsx from 'clsx'
import { CategoryCardProps, ImagePosition, TitlePosition } from './type'
import Image from 'next/image'

const colSpanClasses: Record<number, string> = {
  5: 'col-span-5',
  6: 'col-span-6',
  10: 'col-span-10',
}

const rowSpanClasses: Record<number, string> = {
  1: 'row-span-1',
  2: 'row-span-2',
}

const imagePositionClasses: Record<ImagePosition, string> = {
  'bottom-right': 'bottom-0 right-0',
  'top-left': 'top-0 left-0',
}

const titlPositionClasses: Record<TitlePosition, string> = {
  right: 'text-right',
  left: 'text-left',
  'center-right': 'self-center ml-auto',
}

export default function CategoryCard({
  title,
  image,
  colSpan = 5,
  rowSpan = 1,
  imagePosition = 'bottom-right',
  titlePosition = 'right',
  href,
  customStyles,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={clsx(
        'bg-gray relative flex! rounded-[1.25rem] p-5 transition-opacity hover:opacity-80',
        colSpan && `${colSpanClasses[colSpan]}`,
        rowSpan && `${rowSpanClasses[rowSpan]}`
      )}
      style={
        typeof customStyles === 'object' && customStyles !== null
          ? customStyles
          : undefined
      }
    >
      <h2
        className={clsx(
          'relative z-10 text-2xl',
          titlePosition && `${titlPositionClasses[titlePosition]}`
        )}
      >
        {title}
      </h2>
      <Image
        src={image}
        alt={`Изображение категории "${title}"`}
        className={clsx(
          'absolute h-auto w-auto',
          imagePosition && `${imagePositionClasses[imagePosition]}`
        )}
        width={0}
        height={0}
        sizes="100vw"
      />
    </Link>
  )
}
