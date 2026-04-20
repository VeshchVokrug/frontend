'use client'

import { useCurrentUser } from '@/entities/user/model/use-current-user'
import { useUser } from '@/entities/user/model/use-user'
import UserProfilePage from '@/views/user-profile'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function UserPage() {
  const { data: currentUser } = useCurrentUser()

  const { userId } = useParams<{ userId: string }>()
  const { data: user, isLoading, isError } = useUser(userId)

  const router = useRouter()

  useEffect(() => {
    if (currentUser?.id === userId) {
      router.push('/profile')
    }
  }, [currentUser, userId, router])

  if (isLoading) return <p className="p-6 text-gray-500">Загрузка...</p>

  if (isError || !user)
    return <p className="p-6 text-red-500">Не удалось загрузить профиль</p>

  return <UserProfilePage user={user} />
}
