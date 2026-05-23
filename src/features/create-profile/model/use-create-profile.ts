import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { createProfile } from '../api/create-profile'
import { User } from '@/entities/user/model/schema'
import { createProfileInputData } from './schema'

export const useCreateProifle = () => {
  return useMutation<User, AxiosError, createProfileInputData>({
    mutationFn: createProfile,
    onSuccess: () => {
      toast.success('Профиль создан успешно')
    },
    onError: (error) => {
      const message = (error.response?.data as Record<string, unknown>)?.message || 'Ошибка при создании профиля'
      toast.error(String(message))
    },
  })
}
