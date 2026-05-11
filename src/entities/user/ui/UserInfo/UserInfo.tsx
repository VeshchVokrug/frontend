import Image from 'next/image'
import { User } from '../../model/schema'

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
  return (
    <section
      className={`bg-gray shadow-shadow flex-2 flex-col gap-6 rounded-[30px] p-8.75 shadow-md/40 ${showReportButton && 'relative'}`}
    >
      <div
        className={`flex gap-5 ${isVertical ? 'mb-5 flex-col justify-center' : 'mb-9.5 items-center'}`}
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
