const ACCESS_TOKEN_KEY = 'accessToken'

const isClient = typeof window !== 'undefined'

export const tokenStorage = {
  getAccessToken: (): string | null => {
    if (!isClient) return null
    return localStorage.getItem(ACCESS_TOKEN_KEY)
  },

  setAccessToken: (token: string): void => {
    if (!isClient) return
    localStorage.setItem(ACCESS_TOKEN_KEY, token)
  },

  clearTokens: (): void => {
    if (!isClient) return
    localStorage.removeItem(ACCESS_TOKEN_KEY)
  },
}
