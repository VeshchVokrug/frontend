'use client'

import { useCurrentUser } from '@/entities/user/model/use-current-user'
import { tokenStorage } from '@/shared/lib/tokens'
import Header from '@/widgets/header'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { data: user } = useCurrentUser()

  useEffect(() => {
    const accessToken = tokenStorage.getAccessToken()
    if (!accessToken || !user) {
      router.push('/login')
    }

    const handleLogout = () => router.push('/login')
    window.addEventListener('auth:logout', handleLogout)
    return () => window.removeEventListener('auth:logout', handleLogout)
  }, [router])

  return (
    <>
      <Header />
      {children}
    </>
  )
}
