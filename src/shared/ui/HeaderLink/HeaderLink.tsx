import Image from 'next/image'
import Link from 'next/link'

type Props = {
  text: string
  href: string
  image: string
}

export default function HeaderLink({ text, href, image }: Props) {
  return (
    <Link
      href={href}
      className="flex! flex-col items-center transition-opacity hover:opacity-80"
    >
      <Image
        src={image}
        alt={`Иконка "${text}"`}
        width={31}
        height={33}
        sizes="100vw"
      />
      <span className="text-xl">{text}</span>
    </Link>
  )
}
