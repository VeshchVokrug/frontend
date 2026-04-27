import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { CreateAdvertInputData } from './schema'
import { Advert } from '@/entities/advert'
import { createAdvert } from '../api/create-advert'

export const useCreateAdvert = () => {
  return useMutation<Advert, AxiosError, CreateAdvertInputData>({
    mutationFn: createAdvert,
  })
}
