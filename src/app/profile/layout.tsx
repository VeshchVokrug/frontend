'use client'

import { useCurrentUser } from '@/entities/user/model/use-current-user'
import { tokenStorage } from '@/shared/lib/tokens'
import Header from '@/widgets/header'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { data: user, failureCount, failureReason } = useCurrentUser()

  useEffect(() => {
    const accessToken = tokenStorage.getAccessToken()
    if (
      !accessToken ||
      (!user && failureCount >= 2 && failureReason?.status !== 404)
    ) {
      router.push('/login')
    }

    const handleLogout = () => router.push('/login')
    window.addEventListener('auth:logout', handleLogout)
    return () => window.removeEventListener('auth:logout', handleLogout)
  }, [router, failureCount, user, failureReason])

  return (
    <>
      <Header />
      {children}
    </>
  )
}
