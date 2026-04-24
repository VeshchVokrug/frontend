'use client'

import Header from '@/widgets/header'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
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
