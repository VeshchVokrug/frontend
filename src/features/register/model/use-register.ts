import { useMutation } from '@tanstack/react-query'
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
  })
}
