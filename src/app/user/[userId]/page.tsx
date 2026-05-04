'use client'

import { useCurrentUser } from '@/entities/user/model/use-current-user'
import { useUser } from '@/entities/user/model/use-user'
import UserProfilePage from '@/views/user-profile'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function UserPage() {
  const { data: currentUser } = useCurrentUser()

  const { userId } = useParams<{ userId: string }>()
  const { data: user, isLoading, isError, failureReason } = useUser(userId)

  console.log(failureReason?.status)

  const router = useRouter()

  useEffect(() => {
    if (currentUser?.id === userId) {
      router.push('/profile')
    }
  }, [currentUser, userId, router])

  if (failureReason?.status === 401) {
    return (
      <div className="mx-auto flex flex-col justify-center gap-5">
        <p className="text-[30px]">
          Просмотр профиля доступен только авторизованным пользователям
        </p>
        <Link
          href="/login"
          className="bg-main hover:bg-main-hover active:bg-main-active disabled:bg-disabled mx-auto w-fit rounded-[20px] px-15 py-3 text-[24px]/[30px] font-medium text-white transition"
        >
          Перейти ко входу
        </Link>
      </div>
    )
  }

  if (isLoading) return <p className="p-6 text-gray-500">Загрузка...</p>

  if (isError || !user)
    return <p className="p-6 text-red-500">Не удалось загрузить профиль</p>

  return <UserProfilePage user={user} />
}
