'use client'

import { useCurrentUser } from '@/entities/user/model/use-current-user'
import { tokenStorage } from '@/shared/lib/tokens'
import Image from 'next/image'
import Link from 'next/link'
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
    <>
      <header className="absolute w-full px-22.5 py-15">
        <Link href="/" className="flex h-fit w-fit">
          <Image
            src="/images/logo.png"
            alt="Вещь вокруг"
            width={233}
            height={37}
          />
        </Link>
      </header>
      <main className="mx-auto flex h-screen w-fit items-center">
        {children}
      </main>
    </>
  )
}
