import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { CreateAdvertPayload, CreateAdvertResponse } from './schema'
import { createAdvert } from '../api/create-advert'

export const useCreateAdvert = () => {
  return useMutation<CreateAdvertResponse, AxiosError, CreateAdvertPayload>({
    mutationFn: createAdvert,
    onSuccess: () => {
      toast.success('Объявление создано успешно')
    },
    onError: (error) => {
      const message = (error.response?.data as Record<string, unknown>)?.message || 'Ошибка при создании объявления'
      toast.error(String(message))
    },
  })
}
