'use client'

import { useCurrentUser } from '@/entities/user/model/use-current-user'
import CreateProfileForm from '@/features/create-profile/ui/CreateProfileForm'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function CreateProfilePage() {
  const { data: currentUser } = useCurrentUser()
  const router = useRouter()

  useEffect(() => {
    if (currentUser) router.push('/profile')
  }, [currentUser, router])

  return <CreateProfileForm />
}
