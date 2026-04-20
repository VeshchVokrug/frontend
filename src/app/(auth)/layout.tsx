'use client'

import { useCurrentUser } from '@/entities/user/model/use-current-user'
import { tokenStorage } from '@/shared/lib/tokens'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { data: user } = useCurrentUser()
  const accessToken = tokenStorage.getAccessToken()
  const router = useRouter()

  useEffect(() => {
    if (user && accessToken) {
      router.push('/profile')
    }
  }, [user, router, accessToken])

  return (
    <main className="mx-auto flex h-screen w-fit items-center">{children}</main>
  )
}
