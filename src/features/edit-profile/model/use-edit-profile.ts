import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { editProfile } from '../api/edit-profile'
import { User } from '@/entities/user/model/schema'
import { editProfileInputData } from './schema'

export const useEditProifle = () => {
  return useMutation<User, AxiosError, editProfileInputData>({
    mutationFn: editProfile,
  })
}
