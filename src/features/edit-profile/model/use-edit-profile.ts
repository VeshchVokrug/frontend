import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { editProfile } from '../api/edit-profile'
import { User } from '@/entities/user/model/schema'
import { editProfileInputData } from './schema'

export const useEditProifle = () => {
  return useMutation<User, AxiosError, editProfileInputData>({
    mutationFn: editProfile,
    onSuccess: () => {
      toast.success('Профиль обновлен успешно')
    },
    onError: (error) => {
      const message = (error.response?.data as Record<string, unknown>)?.message || 'Ошибка при обновлении профиля'
      toast.error(String(message))
    },
  })
}
