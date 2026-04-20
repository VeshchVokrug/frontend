'use client'

import { useCurrentUser } from '@/entities/user/model/use-current-user'
import ProfilePage from '@/views/profile'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  const { data: user, isError, failureReason, isLoading } = useCurrentUser()

  const router = useRouter()

  useEffect(() => {
    if (failureReason?.status === 404) {
      router.push('/profile/create')
    }
  }, [failureReason, router])

  if (isLoading) return <p className="p-6 text-gray-500">Загрузка...</p>

  if (isError || !user)
    return <p className="p-6 text-red-500">Не удалось загрузить профиль</p>
  return <ProfilePage user={user} />
}
