import { useMutation } from '@tanstack/react-query'
import { logout } from '../api/logout'
import { AxiosError } from 'axios'
import { queryClient } from '@/app/providers/query-provider'
import { tokenStorage } from '@/shared/lib/tokens'

export const useLogout = () => {
  return useMutation<void, AxiosError>({
    mutationFn: logout,
    onSuccess: () => {
      tokenStorage.clearTokens()
      queryClient.removeQueries({ queryKey: ['current-user'] })
    },
  })
}
