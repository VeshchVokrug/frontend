import HeaderLink from '@/shared/ui/HeaderLink'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="mx-auto mt-13 mb-15 flex w-425 items-center justify-between">
      <Link href="/" className="flex h-fit w-fit">
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
        <HeaderLink text="Избранное" href="profile/favorites">
          <svg
            width="38"
            height="33"
            viewBox="0 0 38 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="group-hover:stroke-main stroke-black transition"
          >
            <path
              d="M18.75 6.8767C14.75 -2.24153 0.75 -1.27036 0.75 10.3838C0.75 22.0379 18.75 31.75 18.75 31.75C18.75 31.75 36.75 22.0379 36.75 10.3838C36.75 -1.27036 22.75 -2.24153 18.75 6.8767Z"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </HeaderLink>
        <HeaderLink text="Профиль" href="/profile">
          <svg
            width="33"
            height="35"
            viewBox="0 0 33 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="group-hover:stroke-main stroke-black transition"
          >
            <path
              d="M31.75 33.75C31.75 28.6874 24.8104 24.5833 16.25 24.5833C7.68959 24.5833 0.75 28.6874 0.75 33.75M16.25 19.0833C10.8997 19.0833 6.5625 14.9793 6.5625 9.91667C6.5625 4.85406 10.8997 0.75 16.25 0.75C21.6003 0.75 25.9375 4.85406 25.9375 9.91667C25.9375 14.9793 21.6003 19.0833 16.25 19.0833Z"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </HeaderLink>
        <HeaderLink text="Совладение" href="/coownership">
          <svg
            width="44"
            height="35"
            viewBox="0 0 44 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="group-hover:stroke-main stroke-black transition"
          >
            <path
              d="M42.75 33.7498C42.75 29.9183 38.8542 26.6586 33.4167 25.4506M28.75 33.75C28.75 28.8899 22.482 24.95 14.75 24.95C7.01801 24.95 0.75 28.8899 0.75 33.75M28.75 18.35C33.9047 18.35 38.0833 14.4101 38.0833 9.55C38.0833 4.68989 33.9047 0.75 28.75 0.75M14.75 18.35C9.59534 18.35 5.41667 14.4101 5.41667 9.55C5.41667 4.68989 9.59534 0.75 14.75 0.75C19.9047 0.75 24.0833 4.68989 24.0833 9.55C24.0833 14.4101 19.9047 18.35 14.75 18.35Z"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </HeaderLink>
      </div>
    </header>
  )
}
