import HeaderLink from '@/shared/ui/HeaderLink'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="mx-auto mt-13 mb-15 flex w-425 items-center gap-35">
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="Вещь вокруг"
          width={233}
          height={37}
        />
      </Link>
      <div className="relative">
        <input
          type="text"
          placeholder="Поиск"
          className="bg-gray text-secondary placeholder:text-secondary h-20 w-250 rounded-4xl px-19 py-11 text-3xl"
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
          text="Корзина"
          href="/cart"
          image="/images/icons/cart.svg"
        ></HeaderLink>
        <HeaderLink
          text="Профиль"
          href="/profile"
          image="/images/icons/profile.svg"
        ></HeaderLink>
      </div>
    </header>
  )
}
