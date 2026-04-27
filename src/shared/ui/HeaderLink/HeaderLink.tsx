import Link from 'next/link'

type Props = {
  text: string
  href: string
  children: React.ReactNode
}

export default function HeaderLink({ text, href, children }: Props) {
  return (
    <Link
      href={href}
      className="group flex! flex-col items-center transition-opacity"
    >
      {children}
      <span className="group-hover:text-main text-xl transition">{text}</span>
    </Link>
  )
}
