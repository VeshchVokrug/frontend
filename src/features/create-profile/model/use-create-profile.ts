import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { createProfile } from '../api/create-profile'
import { User } from '@/entities/user/model/schema'
import { createProfileInputData } from './schema'

export const useCreateProifle = () => {
  return useMutation<User, AxiosError, createProfileInputData>({
    mutationFn: createProfile,
  })
}
