import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { apiClient } from './api-client'
import { tokenStorage } from '../lib/tokens'
import { AuthResponse } from '@/features/login/model/schema'
import { queryClient } from '@/app/providers/query-provider'

interface RetryableRequest extends InternalAxiosRequestConfig {
  _retry?: boolean
}

let isRefreshing = false
let refreshQueue: Array<(token: string) => void> = []

const processQueue = (token: string) => {
  refreshQueue.forEach((resolve) => resolve(token))
  refreshQueue = []
}

export const setupInterceptors = () => {
  apiClient.interceptors.request.use((config) => {
    const token = tokenStorage.getAccessToken()
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  })

  apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetryableRequest | undefined

      if (
        error.response?.status !== 401 ||
        !originalRequest ||
        originalRequest._retry
      ) {
        return Promise.reject(error)
      }

      const refreshToken = tokenStorage.getRefreshToken()
      const accessToken = tokenStorage.getAccessToken()
      if (!refreshToken) {
        tokenStorage.clearTokens()
        queryClient.removeQueries({ queryKey: ['current-user'] })
        return Promise.reject(error)
      }

      if (isRefreshing) {
        return new Promise<string>((resolve) =>
          refreshQueue.push(resolve)
        ).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return apiClient(originalRequest)
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const { data } = await axios.post<AuthResponse>(
          `${process.env.NEXT_PUBLIC_API_URL}/identity/auth/refresh`,
          { accessToken, refreshToken },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        )
        tokenStorage.setTokens(data.accessToken, data.refreshToken)
        processQueue(data.accessToken)
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
        return apiClient(originalRequest)
      } catch (refreshError) {
        tokenStorage.clearTokens()
        queryClient.removeQueries({ queryKey: ['current-user'] })
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }
  )
}
