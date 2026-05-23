import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { register } from '../api/register'
import { AxiosError } from 'axios'
import { AuthResponse, RegisterInputData } from './schema'

export const useRegister = () => {
  return useMutation<
    AuthResponse,
    AxiosError<{ message: string }>,
    RegisterInputData
  >({
    mutationFn: register,
    onSuccess: () => {
      toast.success('Регистрация успешна')
    },
    onError: (error) => {
      toast.error(error.response?.data.message || 'Ошибка при регистрации')
    },
  })
}
