import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { logout } from '../api/logout'
import { queryClient } from '@/app/providers/query-provider'
import { tokenStorage } from '@/shared/lib/tokens'

export const useLogout = () => {
  return useMutation<void, AxiosError>({
    mutationFn: logout,
    onSuccess: () => {
      tokenStorage.clearTokens()
      queryClient.removeQueries({ queryKey: ['current-user'] })
      toast.success('Вы вышли из аккаунта')
    },
    onError: (error) => {
      const message = (error.response?.data as Record<string, unknown>)?.message || 'Ошибка при выходе'
      toast.error(String(message))
    },
  })
}
