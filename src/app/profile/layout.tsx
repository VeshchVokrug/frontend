'use client'

import { useCurrentUser } from '@/entities/user/model/use-current-user'
import { tokenStorage } from '@/shared/lib/tokens'
import Header from '@/widgets/header'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { failureCount, failureReason } = useCurrentUser()
  const accessToken = tokenStorage.getAccessToken()

  useEffect(() => {
    if ((failureCount > 2 && failureReason?.status === 401) || !accessToken) {
      router.push('/login')
    }
  }, [failureReason, failureCount, router, accessToken])

  return (
    <>
      <Header />
      {children}
    </>
  )
}
