import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { login } from '../api/login'
import { AuthResponse, LoginInputData } from './schema'

export const useLogin = () => {
  return useMutation<AuthResponse, AxiosError<{ message: string }>, LoginInputData>({
    mutationFn: login,
    onSuccess: () => {
      toast.success('Вход успешен')
    },
    onError: (error) => {
      toast.error(error.response?.data.message || 'Ошибка при входе')
    },
  })
}
