import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { deleteAdvert } from '../api/delete-advert'

export const useDeleteAdvert = () => {
  const queryClient = useQueryClient()

  return useMutation<void, AxiosError, string>({
    mutationFn: deleteAdvert,
    onSuccess: () => {
      toast.success('Объявление удалено')
      queryClient.invalidateQueries({ queryKey: ['user-rentals'] })
    },
    onError: (error) => {
      const message = (error.response?.data as Record<string, unknown>)?.message || 'Ошибка при удалении объявления'
      toast.error(String(message))
    },
  })
}
