import Image from 'next/image'
import { User } from '../../model/schema'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
  user: User
  isVertical?: boolean
  showReportButton?: boolean
  onReportClick?: () => void
  imageSize?: number
  isCurrentUserProfile?: boolean
}

export default function UserInfo({
  user,
  isVertical = false,
  showReportButton = false,
  onReportClick,
  imageSize = 150,
  isCurrentUserProfile = true,
}: Props) {
  const pathname = usePathname()
  return (
    <section
      className={`bg-gray shadow-shadow flex-2 flex-col gap-6 rounded-[30px] p-8.75 shadow-md/40 ${showReportButton && 'relative'}`}
    >
      <div
        className={`relative flex gap-5 ${isVertical ? 'mb-5 flex-col justify-center' : 'mb-9.5 items-center'}`}
      >
        <div className="aspect-square w-fit rounded-[20px] bg-white">
          <Image
            src={
              user.avatarUrl
                ? user.avatarUrl
                : '/images/default-user-avatar.png'
            }
            alt={`Фотография пользователя ${user.name}`}
            width={imageSize}
            height={imageSize}
            className="object-cover"
          />
        </div>
        <p className="text-[36px] font-bold">{user.name}</p>

        {isCurrentUserProfile && (
          <Link href={`${pathname}/edit`} className="absolute top-5 right-5">
            {' '}
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="hover:stroke-main-hover stroke-main active:stroke-main-active transition"
            >
              <path
                d="M17.3986 8.90243L2 24.3008V32L9.69929 32L25.0979 16.6016M17.3986 8.90243L22.9202 3.38085L22.9235 3.37758C23.6836 2.61751 24.0643 2.2368 24.5032 2.09421C24.8898 1.9686 25.3062 1.9686 25.6928 2.09421C26.1314 2.2367 26.5116 2.61697 27.2706 3.37596L30.6194 6.72472C31.3817 7.48697 31.763 7.86828 31.9058 8.30776C32.0314 8.69434 32.0314 9.11076 31.9058 9.49735C31.7631 9.93652 31.3823 10.3172 30.6212 11.0784L30.6195 11.08L25.0979 16.6016M17.3986 8.90243L25.0979 16.6016"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-2.5">
        <div className="flex flex-col justify-center">
          <p className="text-[30px]">Описание профиля:</p>
          <p className="text-[30px]">{user.bio || 'Не указано'}</p>
        </div>

        {isCurrentUserProfile && (
          <>
            <div className="flex items-center gap-5">
              <p className="text-[30px]">Email:</p>
              <p className="text-[30px]">{user.email || 'Не указано'}</p>
            </div>

            <div className="flex items-center gap-5">
              <p className="text-[30px]">Телефон:</p>
              <p className="text-[30px]">{user.phone || 'Не указано'}</p>
            </div>
          </>
        )}
      </div>

      {showReportButton && (
        <button
          className="shadow-shadow bg-dangerous hover:bg-red absolute top-5.75 right-4.25 aspect-square w-12.5 rounded-full text-[30px] text-white shadow-md/60 transition"
          type="button"
          aria-label="Пожаловаться"
          title="Пожаловаться"
          onClick={onReportClick}
        >
          !
        </button>
      )}
    </section>
  )
}
