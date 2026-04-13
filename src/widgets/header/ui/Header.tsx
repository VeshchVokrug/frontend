import HeaderLink from '@/shared/ui/HeaderLink'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="mx-auto mt-13 mb-15 flex w-425 items-center justify-between">
      <Link href="/" className="h-full w-fit">
        <Image
          src="/images/logo.png"
          alt="Вещь вокруг"
          width={233}
          height={37}
        />
      </Link>
      <div className="relative w-fit">
        <input
          type="text"
          placeholder="Поиск"
          className="bg-gray text-secondary placeholder:text-secondary h-20 w-240 rounded-4xl px-9.5 py-5.5 text-3xl"
        />
        <button>
          <Image
            src="/images/icons/search.svg"
            alt="Иконка поиска"
            width={24}
            height={24}
            className="absolute top-1/2 right-11 -translate-y-1/2"
          />
        </button>
      </div>

      <div className="flex items-center gap-12">
        <HeaderLink
          text="Избранное"
          href="/favorites"
          image="/images/icons/favorites.svg"
        />
        <HeaderLink
          text="Профиль"
          href="/profile"
          image="/images/icons/profile.svg"
        />
        <HeaderLink
          text="Совладение"
          href="/coownership"
          image="/images/icons/coownership.svg"
        />
      </div>
    </header>
  )
}
