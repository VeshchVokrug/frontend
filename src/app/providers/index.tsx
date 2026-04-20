'use client'

import { ReactNode } from 'react'
import { QueryProvider } from './query-provider'
import { setupInterceptors } from '@/shared/api/interceptors'

setupInterceptors()

export function Providers({ children }: { children: ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>
}